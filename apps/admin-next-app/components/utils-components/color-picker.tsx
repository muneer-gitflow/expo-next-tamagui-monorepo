import React, { useState } from 'react';
import { ColorPicker, TextField, Popover, Box, hsbToHex } from '@shopify/polaris';

function ColorPickerWithPreview() {
  const [hexValue, setHexValue] = useState('#000000');
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => setPopoverActive((active) => !active);

  const handleInputChange = (value) => {
    setHexValue(value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'self-end', gap: '10px' }}>
      <Box width="100%">
        <TextField
          label="Icon color"
          value={hexValue}
          onChange={handleInputChange}
          placeholder="#000000"
          autoComplete="off"
        />
      </Box>
      <div style={{ position: 'relative' }}>
        <Popover
          active={popoverActive}
          activator={
            <div
              onClick={togglePopoverActive}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: hexValue,
                borderRadius: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
            ></div>
          }
          onClose={togglePopoverActive}
        >
          <div style={{ padding: '10px' }}>
            <ColorPicker
              onChange={(color) => setHexValue(hsbToHex(color))}
              color={{
                hue: 0,
                brightness: 1,
                saturation: 0,
              }}
              allowAlpha={false}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default ColorPickerWithPreview;
