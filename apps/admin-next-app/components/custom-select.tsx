import Select from 'react-select';

// Define a custom type for the props
type CustomOptionProps = {
  data: {
    label: string;
    badge?: string;
  };
  innerRef: React.Ref<HTMLDivElement>;
  innerProps: React.HTMLProps<HTMLDivElement>;
  isFocused: boolean; // Add any other properties you need
};

const DropdownWithSections = () => {
  const options = [
    {
      label: 'Home',
      options: [{ value: 'home', label: 'General', isDisabled: true }],
    },
    {
      label: 'Custom screen',
      options: [{ value: 'create', label: '+ Create new screen' }],
    },
    {
      label: 'Search',
      options: [
        { value: 'result-list', label: 'Result list', badge: 'Advanced' },
        { value: 'search-start', label: 'Search start', badge: 'Advanced' },
        { value: 'no-results', label: 'No search results', badge: 'Advanced' },
      ],
    },
    {
      label: 'Product',
      options: [{ value: 'product-details', label: 'Product details', badge: 'Advanced' }],
    },
    {
      label: 'Cart',
      options: [
        { value: 'cart-with-items', label: 'Cart with items', badge: 'Advanced' },
        { value: 'empty-cart', label: 'Empty cart', badge: 'Advanced' },
      ],
    },
    {
      label: 'Account',
      options: [{ value: 'account', label: 'Advanced' }],
    },
  ];

  const customOption = (props: CustomOptionProps) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: props.isFocused ? '#f4f4f4' : 'white',
        }}
      >
        {data.label}
        {data.badge ? <span style={{ color: '#0070f3' }}>{data.badge}</span> : null}
      </div>
    );
  };

  return (
    <>
      <Select
        options={options}
        components={{
          //   SingleValue: customSingleValue,
          Option: customOption,
        }}
        placeholder="Select a screen"
      />
    </>
  );
};

export default DropdownWithSections;
