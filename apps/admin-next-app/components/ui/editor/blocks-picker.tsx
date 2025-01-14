"use client"
import DraggableComponent from '@/components/draggables';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import type { AppDispatch, RootState } from 'app/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../search';
import { clearSearch, searchBlocks, setUIBlocks } from '@/lib/store/reducers/ui-blocks.slice';
import { DROPPABLE_ID } from '@/lib/const';
import { useGetBlockDefinitionsQuery } from '@/lib/api/cms-api';
import type { UIBlock } from '@/lib/store/types';
import { useEffect } from 'react';

export default function BlocksPicker() {
  const activeTheme = useSelector((state: RootState) => state.theme.activeTheme);
  const currentScreen = useSelector((state: RootState) => state.theme.currentScreen);
  const displayBlocks = useSelector((state: RootState) => state.uiBlocks.displayBlocks);
  const searchTerm = useSelector((state: RootState) => state.uiBlocks.searchTerm);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error, refetch } = useGetBlockDefinitionsQuery(
    {
      themeId: activeTheme?.id || '',
      screenName: currentScreen?.name || '',
    },
    {
      skip: !activeTheme?.id || !currentScreen?.name,
    },
  );

  useEffect(() => {
    if (data) {
      dispatch(setUIBlocks(data));
    }

    if (error) {
      console.error(error);
    }
  }, [data, error, dispatch]);

  useEffect(() => {
    if (!isLoading && !error) {
      if (activeTheme?.id && currentScreen?.name) {
        refetch();
      }
    }
  }, [activeTheme?.id, currentScreen?.name, refetch, isLoading, error]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    dispatch(searchBlocks(searchValue));
  };

  const onClearSearch = () => {
    dispatch(clearSearch());
  };

  return (
    <div
      style={{
        flex: '0 0 316px',
        borderLeft: '1px solid #ccc',
        padding: '10px',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: 'calc(100vh - 64px)',
      }}
    >
      <Search onSearch={onSearch} search={searchTerm} clearSearch={onClearSearch} />
      <Droppable droppableId={DROPPABLE_ID.COMPONENTS_PICKER}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            style={{
              // background: snapshot.isDraggingOver ? 'lightblue' : '#f9f9f9',
              background: '#fff !important',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              border: 'none',
              transition: 'background 0.2s',
            }}
            {...provided.droppableProps}
          >
            {displayBlocks &&
              displayBlocks.length > 0 &&
              displayBlocks?.map((item: UIBlock, index: number) => (
                <Draggable draggableId={item.block_id} index={index} key={item.block_id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        // Merge provided styles with ours
                        ...provided.draggableProps.style,
                        // border: '1px solid #999',
                        // padding: '8px',
                        // marginBottom: '8px',
                        backgroundColor: snapshot.isDragging ? 'darkgray' : '#fff',
                        color: snapshot.isDragging ? '#fff' : '#000',
                        cursor: 'grab',
                      }}
                    >
                      <div>
                        <DraggableComponent block={item} id={item.block_id} mode="preview" isActive={false} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            {isLoading ? <div>Loading...</div> : null}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
