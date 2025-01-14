'use client';
import { Box } from '@shopify/polaris';
import styles from './mobile-simulator.module.css';
import { useEffect } from 'react';
import { DeviceStatusBar } from './device-status-bar';
import { DeviceFrame } from './device-frame';
import { DeviceScreen } from './device-screen';
import { type DroppableProvided, Droppable } from '@hello-pangea/dnd';
import { DROPPABLE_ID } from '@/lib/const';
import SimulatorItem from '../simulator-item';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store/store';
import { useFetchVendorBlocksQuery } from '@/lib/api/cms-api';
import { setVendorBlocks } from '@/lib/store/reducers/vendor-blocks.slice';
import SimulatorPlaceholder from './simulator-placeholder';
import ScreenSelector from '../ui/screen-selector';
import SimulatorScreenWrapper from '../simulator-screen-wrapper';
import {
  addComponent,
  resetComponents,
  type DnDComponent,
} from '@/lib/store/reducers/dnd.slice';

export default function EditorSimulator() {
  const dispatch = useDispatch<AppDispatch>();
  const droppedComponents = useSelector(
    (state: RootState) => state.dnd.droppedComponents
  );

  const currentScreen = useSelector(
    (state: RootState) => state.theme.currentScreen
  );
  const themeId = useSelector(
    (state: RootState) => state.theme.activeTheme?.id
  );

  const { data, error, refetch, isLoading } = useFetchVendorBlocksQuery(
    { themeId: Number(themeId), screenId: Number(currentScreen?.id) },
    {
      skip: !currentScreen?.id || !themeId,
    }
  );

  useEffect(() => {
    if (!isLoading && !error) {
      if (themeId && currentScreen?.name) {
        refetch();
      }
    }
  }, [themeId, currentScreen?.name, refetch, isLoading, error]);

  useEffect(() => {
    if (error) {
      console.log('error', error);
      return;
    }

    if (data?.length) {
      for (const block of data) {
        dispatch(
          addComponent({
            id: block.id,
            block_id: block.block_id,
            display_name: block.display_name,
            config: block.config,
            index: block.order,
            ...block.ui_block,
          })
        );
      }

      dispatch(setVendorBlocks(data));

      return;
    }

    // TODO -- check if array has draft blocks

    // set if any vendors loaded for previous screen
    dispatch(setVendorBlocks([]));

    // reset components which are from previous screen
    dispatch(resetComponents());
    return;
  }, [data, error, dispatch]);

  return (
    <Box
      width="calc(100% - 316px - 316px)"
      borderInlineStartWidth="0165"
      borderColor="border-brand"
      background="bg"
      position="relative"
      overflowX="hidden"
      overflowY="hidden"
    >
      <ScreenSelector />
      <div
        className={styles.simulatorScreenCenterFix}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DeviceFrame>
          <DeviceStatusBar />
          <DeviceScreen>
            <Droppable droppableId={DROPPABLE_ID.MOBILE_SIMULATOR}>
              {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <SimulatorScreenWrapper>
                    {droppedComponents?.length > 0 ? (
                      droppedComponents?.map(
                        (item: DnDComponent, index: number) => (
                          <SimulatorItem
                            key={item?.id}
                            index={index}
                            item={item}
                          />
                        )
                      )
                    ) : (
                      <SimulatorPlaceholder
                        index={0}
                        id={DROPPABLE_ID.MOBILE_SIMULATOR}
                      />
                    )}
                  </SimulatorScreenWrapper>
                </div>
              )}
            </Droppable>
          </DeviceScreen>
        </DeviceFrame>
      </div>
    </Box>
  );
}
