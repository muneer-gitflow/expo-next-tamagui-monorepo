import { DropZone, InlineGrid, TextField, RadioButton, Box } from '@shopify/polaris';
import ColorPickerWithPreview from '../../utils-components/color-picker';
import React, { useState, useCallback } from 'react';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
const fileUpload = <DropZone.FileUpload />;

export default function SidebarSetting() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const handleTextFieldChange = useCallback((value: string) => setTextFieldValue(value), []);
  const [value, setValue] = useState('disabled');
  const handleChange = useCallback((_: boolean, newValue: string) => setValue(newValue), []);

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
        <RadioButton
          label="Use this Text"
          checked={value === 'disabled'}
          id="disabled"
          name="accounts"
          onChange={handleChange}
        />
        <Box paddingInlineStart={'600'}>
          <TextField
            label="App Name"
            value={textFieldValue}
            placeholder="App name"
            onChange={handleTextFieldChange}
            maxLength={30}
            autoComplete="off"
            showCharacterCount
          />
          <ColorPickerWithPreview />
        </Box>
        <RadioButton
          label="Upload Logo"
          checked={value === 'disabled'}
          id="disabled"
          name="accounts"
          onChange={handleChange}
        />
        <Box paddingInlineStart={'600'}>
          <DropZone allowMultiple={false} accept={validImageTypes.join(',')} type="image" onDrop={() => {}}>
            {fileUpload}
          </DropZone>
        </Box>
      </InlineGrid>

      <InlineGrid gap={'200'}>
        <span
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          Background
        </span>
        <DropZone allowMultiple={false} accept={validImageTypes.join(',')} type="image" onDrop={() => {}}>
          {fileUpload}
        </DropZone>
      </InlineGrid>

      <ColorPickerWithPreview />
    </div>
  );
}
