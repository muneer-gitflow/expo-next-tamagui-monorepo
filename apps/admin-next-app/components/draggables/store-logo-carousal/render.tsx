import { useSelector } from 'react-redux';
import type { RootState } from 'app/lib/store/store';
import { InlineGrid, InlineStack } from '@shopify/polaris';

interface Store {
  id: string;
  image?: string;
  name?: string;
  navigateTo: string | null;
  navigationType: 'product' | 'collection' | 'page' | 'url' | null;
}

interface VendorBlock {
  id: string;
  config: {
    stores: Store[];
  };
  ui_block: {
    id: string;
    block_id: string;
    name: string;
  };
}

export default function StoreLogoCarouselRender({ blockId, isActive }: { blockId: string; isActive: boolean }) {
  const { block } = useSelector((state: RootState) => state?.uiBlocks?.currentBlock);
  const vendorBlocks = useSelector((state: RootState) => state.vendorBlocks.blocks) as VendorBlock[];

  const currentBlockConfig = vendorBlocks.find((vendorBlock) => block?.block_id === vendorBlock?.ui_block?.block_id);

  // If no config found, show default 4 stores
  const stores =
    currentBlockConfig?.config?.stores ||
    Array.from({ length: 4 }, (_, i) => ({
      id: String(i + 1),
      name: `Store ${i + 1}`,
      image: undefined,
      navigateTo: null,
      navigationType: null,
    }));

  return (
    <>
      <InlineGrid gap={'200'}>
        <InlineStack align="space-between" blockAlign="center">
          <span
            style={{
              color: '#FFFFFF',
            }}
          >
            Our Stores
          </span>
          <a
            style={{
              color: '#528F65',
              textDecoration: 'none',
              fontSize: '12px',
            }}
            href="#"
          >
            View All
          </a>
        </InlineStack>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {stores.map((store, index) => (
            <InlineGrid gap={'100'} alignItems="center" key={store.id || index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f1f1',
                  height: '60px',
                  width: '60px',
                  borderRadius: '100%',
                }}
              >
                {store?.image ? (
                  <img
                    src={store.image}
                    alt={store.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img width="18" src="/imagePlaceholder.svg" />
                )}
              </div>
              <span
                style={{
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {store.name || `Store ${index + 1}`}
              </span>
            </InlineGrid>
          ))}
        </div>
      </InlineGrid>
    </>
  );
}
