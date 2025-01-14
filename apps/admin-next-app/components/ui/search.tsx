import { Icon } from '@shopify/polaris';
import { SearchIcon, XIcon } from '@shopify/polaris-icons';

export default function Search({
  onSearch,
  search,
  clearSearch,
}: {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  clearSearch: () => void;
}) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          paddingInline: '10px',
          width: '100%',
          background: 'white',
          alignItems: 'center',
          color: '#000',
          gap: '5px',
          borderRadius: '5px',
          border: '1px solid #00000036',
        }}
      >
        <Icon source={SearchIcon} tone="inherit" />
        <input
          onChange={onSearch}
          value={search}
          placeholder="Search Component"
          style={{
            width: '100%',
            height: '40px',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: 'black',
          }}
        />
        {/* add clear button */}
        <button
          onClick={clearSearch}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <Icon source={XIcon} tone="inherit" />
        </button>
      </div>
    </>
  );
}
