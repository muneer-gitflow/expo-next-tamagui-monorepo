import { DragHandleIcon, DeleteIcon, PlusIcon, HeartIcon, WandIcon } from '@shopify/polaris-icons';
import {
  Button,
  DropZone,
  InlineGrid,
  Spinner,
  Modal,
  Text,
  TextField,
  RadioButton,
  Box,
  Select,
  Icon,
  LegacyStack,
  Tag,
} from '@shopify/polaris';
import { DragDropContext, Draggable, Droppable, DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import React, { useState, useCallback } from 'react';
import type { RootState } from '@/lib/store/store';
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
const fileUpload = <DropZone.FileUpload />;
const compontentsArray = [
  {
    id: 'home',
    content: 'Home',
  },
  {
    id: 'navigation',
    content: 'Navigation',
  },
  {
    id: 'product',
    content: 'Product',
  },
];
export default function NavigationSidebarSettings() {
  const [draggable, setDraggable] = useState(compontentsArray);
  const [textFieldValue, setTextFieldValue] = useState('');
  const handleTextFieldChange = useCallback((value: string) => setTextFieldValue(value), []);
  const [value, setValue] = useState('disabled');
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback((value: string) => setSelected(value), []);

  const options = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'lastWeek' },
  ];
  const handleChange = useCallback((_: boolean, newValue: string) => setValue(newValue), []);
  const [showPreviewModalNew, setShowPreviewModalNew] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );
  const onDragEnd = useCallback((result: { destination: { droppableId: string }; draggableId: string }) => {
    console.log('result', result);
    if (!result.destination) {
      return;
    }

    // the only one that is required
  }, []);
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
        gap: '20px',
      }}
    >
      <InlineGrid gap={'200'}>
        <span
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          Background
        </span>
        <DropZone allowMultiple={false} accept={validImageTypes.join(',')} type="image" onDrop={handleDropZoneDrop}>
          {fileUpload}
        </DropZone>
      </InlineGrid>
      <Box background="bg" borderColor="border" borderWidth="0165" padding={'400'} borderRadius="200">
        <span
          style={{
            display: 'flex',
            width: '100%',
            marginBottom: '5px',
          }}
        >
          Hidden menu items
        </span>
        <InlineGrid gap={'300'}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {draggable.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div
                            className="dragHiddenElement"
                            style={{
                              display: 'flex',
                              height: '38px',
                              background: '#fff',
                              border: '#999 solid 1px',
                              borderRadius: '10px',
                              color: '#333',
                              textDecoration: 'none',
                              padding: '0 10px',
                              alignItems: 'center',
                            }}
                          >
                            <style>{`
                            .dragHiddenElement .Polaris-Icon{
                            margin:unset;
                            }
                            `}</style>
                            <Icon source={DragHandleIcon} />
                            {item.content}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </InlineGrid>
      </Box>
      <InlineGrid gap={'300'}>
        <span
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          Showing 4 of max 10 items
        </span>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {draggable.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div
                          className="dragHiddenElement"
                          style={{
                            display: 'flex',
                            height: '38px',
                            background: '#fff',
                            border: '#999 solid 1px',
                            borderRadius: '10px',
                            color: '#333',
                            textDecoration: 'none',
                            padding: '0 10px',
                            alignItems: 'center',
                          }}
                        >
                          <style>{`
                            .dragHiddenElement .Polaris-Icon{
                            margin:unset;
                            }
                            `}</style>
                          <Icon source={DragHandleIcon} />
                          {item.content}
                          <div
                            style={{
                              marginLeft: 'auto',
                              color: '#09c',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <Button removeUnderline variant="plain">
                              Edit
                            </Button>
                            <Button removeUnderline icon={DeleteIcon} variant="plain"></Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div
          style={{
            display: 'flex',
            padding: '8px',
            border: '#999 solid 1px',
            borderRadius: '10px',
            color: '#333',
            textDecoration: 'none',
            alignItems: 'center',
          }}
        >
          <Button
            removeUnderline
            icon={PlusIcon}
            variant="plain"
            fullWidth
            textAlign="left"
            onClick={() => setShowPreviewModalNew(true)}
          >
            Add menu item
          </Button>
        </div>
      </InlineGrid>
      <Modal
        // activator={activator}
        open={showPreviewModalNew}
        onClose={() => setShowPreviewModalNew(false)}
        title="Add navigation item"
        primaryAction={{
          content: 'Add',
          onAction: () => setShowPreviewModalNew(false),
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setShowPreviewModalNew(false),
          },
        ]}
      >
        <Modal.Section>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              marginBottom: '20px',
              gap: '15px',
            }}
          >
            <TextField
              label="Title"
              value={textFieldValue}
              placeholder="E.g. Home"
              onChange={handleTextFieldChange}
              maxLength={30}
              autoComplete="off"
              showCharacterCount
            />
            <InlineGrid gap={'200'}>
              <RadioButton
                label="Screen"
                checked={value === 'disabled'}
                id="disabled"
                name="accounts"
                onChange={handleChange}
              />
              <Box paddingInlineStart={'600'}>
                <Select label="" options={options} onChange={handleSelectChange} value={selected} />
              </Box>
              <RadioButton
                label="Product"
                id="optional"
                name="accounts"
                checked={value === 'optional'}
                onChange={handleChange}
              />
              <RadioButton
                label="Collection"
                id="optional"
                name="accounts"
                checked={value === 'optional'}
                onChange={handleChange}
              />
              <RadioButton
                label="External link"
                id="optional"
                name="accounts"
                checked={value === 'optional'}
                onChange={handleChange}
              />
            </InlineGrid>
          </div>
        </Modal.Section>
      </Modal>
    </div>
  );
}
