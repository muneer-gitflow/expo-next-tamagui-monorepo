"use client"
import { useSelector, useDispatch } from 'react-redux';
import DraggableComponent from '@/components/draggables';
import type { AppDispatch, RootState } from '@/lib/store/store';
import { useEffect } from 'react';
import { useGetVendorBlockByUIBlockQuery } from '@/lib/api/cms-api';
import { setCurrentBlockConfig } from '@/lib/store/reducers/dnd.slice';
import type { UIBlock, VendorBlock } from '@/lib/store/types';
import { FormMutationProvider } from '@/app/contexts/form-mutation-context';

export default function SidebarSetting() {
  const block_id = useSelector((state: RootState) => state?.dnd?.currentBlock?.block_id);
  const dispatch = useDispatch<AppDispatch>();
  const currentBlock = useSelector((state: RootState) => state.dnd?.currentBlock);
  const { data, isLoading } = useGetVendorBlockByUIBlockQuery(
    {
      blockId: block_id || '',
    },
    {
      skip: !block_id,
    },
  );

  useEffect(() => {
    if (data?.length) {
      const vendorBlockConfig = data[0] as VendorBlock;
      if (vendorBlockConfig.id) {
        dispatch(setCurrentBlockConfig({ config: vendorBlockConfig.config, vendorBlockId: vendorBlockConfig.id }));
      } else {
        dispatch(setCurrentBlockConfig({ config: null, vendorBlockId: null }));
      }
    }
  }, [data, dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        background: '#fff',
        minHeight: '100%',
        width: '316px',
        flexDirection: 'column',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 64px)',
        padding: '15px',
      }}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <FormMutationProvider>
          <DraggableComponent
            id={String(block_id) || ''}
            mode="config"
            isActive={true}
            block={currentBlock as UIBlock}
          />
        </FormMutationProvider>
      )}
    </div>
  );
}
