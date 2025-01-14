import { Icon } from '@shopify/polaris';
import { SearchIcon, SendIcon } from '@shopify/polaris-icons';

export default function SearchBarRender({ blockId }: { blockId: string }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          paddingInline: '10px',
          width: '100%',
          background: '#00000036',
          alignItems: 'center',
          color: '#fff',
          gap: '5px',
          borderRadius: '5px',
        }}
      >
        <Icon source={SearchIcon} tone="inherit" />
        <input
          placeholder="Search product"
          style={{
            width: '100%',
            height: '40px',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: '#fff',
          }}
        />
        <span
          style={{
            background: '#1A1A1A',
            minWidth: '30px',
            height: '30px',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon source={SendIcon} tone="inherit" />
        </span>
      </div>
    </>
  );
}
