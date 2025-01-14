import { Autocomplete } from '@shopify/polaris';
import { useState } from 'react';

const PageSelector = ({
  pageTarget,
  onSelect,
}: {
  pageTarget: string | null;
  onSelect: (value: { navigationType: 'page'; value: string; label: string }) => void;
}) => {
  const [target, setTarget] = useState<string>(pageTarget || '');
  // todo: get pages from shopify
  // allow search using text field

  const options: {
    value: string;
    label: string;
  }[] = [
    { value: 'Home', label: 'Home' },
    { value: 'About', label: 'About' },
    { value: 'Contact', label: 'Contact' },
  ];

  return (
    <Autocomplete
      options={options}
      selected={target ? [target] : []}
      onSelect={(value) => {
        const label = options.find((option) => option.value === value[0])?.label;
        setTarget(label || '');
        onSelect({
          navigationType: 'page',
          value: value[0] || '',
          label: label || '',
        });
      }}
      loading={false}
      textField={<Autocomplete.TextField value={target} label="Search for a page" autoComplete="off" />}
    />
  );
};

export default PageSelector;
