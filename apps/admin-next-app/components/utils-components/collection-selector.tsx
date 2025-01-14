import { Autocomplete, Spinner, Icon } from '@shopify/polaris';
import { CollectionFeaturedIcon } from '@shopify/polaris-icons';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCollections } from '@/lib/store/reducers/collections.slice';
import type { AppDispatch, RootState } from '@/lib/store/store';

const CollectionSelector = ({
  collectionTarget,
  onSelect,
  selectedCollection,
}: {
  collectionTarget: string | null;
  onSelect: (value: { navigationType: 'collection'; value: string; label: string }) => void;
  selectedCollection: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { collections, isLoading } = useSelector((state: RootState) => state.collections);
  const [selected, setSelected] = useState<string[]>(collectionTarget ? [collectionTarget] : []);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (collections.length === 0) {
      dispatch(searchCollections({ first: 5 }));
    }
  }, [dispatch, collections.length]);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);
      if (value.length > 2) {
        dispatch(searchCollections({ searchTerm: value, first: 10 }));
      }
    },
    [dispatch],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected[0];
      const selectedOption = collections.find((option) => option.value === selectedValue);

      setSelected(selected);
      if (selectedOption) {
        onSelect({
          navigationType: 'collection',
          value: selectedOption.value,
          label: selectedOption.label,
        });
      }
    },
    [onSelect, collections],
  );

  const options = selectedCollection ? [selectedCollection] : collections;

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
          <Icon source={CollectionFeaturedIcon} tone="base" />
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
            label="Search for a collection"
            value={inputValue}
            prefix={isLoading ? <Spinner size="small" /> : null}
            autoComplete="off"
            placeholder="Search collections..."
          />
        }
      />
    </div>
  );
};

export default CollectionSelector;
