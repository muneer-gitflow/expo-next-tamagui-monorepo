import React from 'react';
import { Box, Text, Icon } from '@shopify/polaris';
import { DragHandleIcon } from '@shopify/polaris-icons';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';
import { Draggable } from '@hello-pangea/dnd';
import styles from '../simulator-item.module.css';

interface SimulatorPlaceholderProps {
  index: number;
  id: string;
}

export default function SimulatorPlaceholder({ index, id }: SimulatorPlaceholderProps) {
  const { currentScreen } = useSelector((state: RootState) => state.theme);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.itemWrapper}
        >
          <div
            style={{
              backgroundColor: 'rgb(31, 33, 36)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px dashed rgb(111, 115, 123)',
              minHeight: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '16px',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            <Box>
              <div
                style={{
                  backgroundColor: 'rgb(50, 53, 62)',
                  padding: '12px',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              >
                <Icon source={DragHandleIcon} tone="subdued" />
              </div>
              <Text as="p" tone="subdued">
                Drag and drop blocks here to build your mobile screen for{' '}
                {currentScreen?.variant?.display_name || currentScreen?.display_name}
              </Text>
            </Box>
          </div>
        </div>
      )}
    </Draggable>
  );
}
