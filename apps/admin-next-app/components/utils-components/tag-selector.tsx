// component to search and select tags added in shopify
import { Autocomplete, Spinner, Icon } from '@shopify/polaris';
import { ProductAddIcon } from '@shopify/polaris-icons';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '@/lib/store/reducers/products.slice';
import type { AppDispatch, RootState } from '@/lib/store/store';

const TagSelector = ({
  productTarget,
  onSelect,
  selectedProduct,
  placeholder,
  label,
}: {
  productTarget: string | null;
  onSelect: (value: { navigationType: 'product'; value: string; label: string }) => void;
  selectedProduct: any;
  placeholder?: string;
  label?: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector((state: RootState) => state.products);
  const [selected, setSelected] = useState<string[]>(productTarget ? [productTarget] : []);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (products.length === 0) {
      dispatch(searchProducts({ first: 5 }));
    }
  }, [dispatch, products.length]);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);
      if (value.length > 2) {
        dispatch(searchProducts({ searchTerm: value, first: 10 }));
      }
    },
    [dispatch],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected[0];
      const selectedOption = products.find((option) => option.value === selectedValue);

      setSelected(selected);
      if (selectedOption) {
        onSelect({
          navigationType: 'product',
          value: selectedOption.value,
          label: selectedOption.label,
        });
      }
    },
    [onSelect, products],
  );

  const options = selectedProduct ? [selectedProduct] : products;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {selected.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: 'var(--p-surface-selected)',
            borderRadius: '4px',
            border: '1px solid var(--p-border-subdued)',
          }}
        >
          <Icon source={ProductAddIcon} tone="base" />
          <span style={{ fontSize: '14px' }}>{options.find((opt) => opt.value === selected[0])?.label || ''}</span>
        </div>
      )}

      <Autocomplete
        options={options.map((option) => ({
          value: option.value,
          label: option.label,
          media: option.image ? (
            <img
              src={option.image}
              alt={option.label}
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginRight: '8px',
              }}
            />
          ) : undefined,
        }))}
        selected={selected}
        onSelect={updateSelection}
        loading={isLoading}
        textField={
          <Autocomplete.TextField
            onChange={updateText}
            label={label || 'Search for a product'}
            value={inputValue}
            prefix={isLoading ? <Spinner size="small" /> : null}
            autoComplete="off"
            placeholder={placeholder || 'Search products...'}
          />
        }
      />
    </div>
  );
};

export default TagSelector;
