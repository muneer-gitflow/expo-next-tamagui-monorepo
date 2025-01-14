import React, { useState, useCallback } from 'react';
import { AppProvider, Autocomplete, TextField, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';

export default function SearchableSelectBox() {
  const deselectedOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' },
  ];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Track selected value(s)
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  // Update the options based on the search text
  const updateText = useCallback((value: string) => {
    setInputValue(value);

    if (value === '') {
      setOptions(deselectedOptions);
      return;
    }

    const filteredOptions = deselectedOptions.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase()),
    );
    setOptions(filteredOptions);
  }, []);

  // Handle selection
  const handleSelect = useCallback(
    (selected: string[]) => {
      setSelectedOptions(selected);
      const matchedOption = deselectedOptions.find((option) => option.value === selected[0]);
      setInputValue(matchedOption ? matchedOption.label : '');
    },
    [deselectedOptions],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Select Collection"
      value={inputValue}
      prefix={<Icon source={SearchIcon} />}
      placeholder="Search for a color"
      autoComplete="off"
    />
  );

  return (
    <AppProvider
      i18n={{
        Polaris: {
          Common: {},
        },
      }}
    >
      <Autocomplete options={options} selected={selectedOptions} onSelect={handleSelect} textField={textField} />
      {/* <div style={{ height: '225px' }}>
      </div> */}
    </AppProvider>
  );
}
