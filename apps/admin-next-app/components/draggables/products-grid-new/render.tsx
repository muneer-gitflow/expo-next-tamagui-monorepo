import { Box, InlineGrid, InlineStack } from '@shopify/polaris';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store/store';
import { useEffect, useState } from 'react';
import PlaceholderImage from '@/components/ui/place-holder-image';
import { selectCollectionProducts, getCollectionDetails } from '@/lib/store/reducers/collections.slice';

interface Props {
  blockId: string;
  isActive: boolean;
}

type ProductGridConfigType = {
  title: string;
  collectionTarget: {
    navigationType: 'collection';
    value: string;
    label: string;
  };
  productsCount: string;
};

export default function ProductsGridNewRender({ blockId, isActive }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const currentBlockConfig = useSelector((state: RootState) => state?.dnd?.currentBlock?.config);
  const savedConfig = useSelector(
    (state: RootState) => state?.dnd?.droppedComponents?.find((c) => c.block_id === blockId)?.config,
  );

  const configToRender = isActive
    ? (currentBlockConfig as ProductGridConfigType)
    : (savedConfig as ProductGridConfigType);

  const cachedProducts = useSelector((state: RootState) =>
    configToRender?.collectionTarget?.value
      ? selectCollectionProducts(state, configToRender.collectionTarget.value)
      : undefined,
  );
  const [products, setProducts] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!configToRender?.collectionTarget?.value) return;

      const requestedCount = Number(configToRender?.productsCount) || 4;

      if (cachedProducts) {
        if (cachedProducts.length < requestedCount) {
          try {
            await dispatch(
              getCollectionDetails({
                collectionId: configToRender.collectionTarget.value,
                first: requestedCount,
              }),
            ).unwrap();
          } catch (error) {
            console.error('Error fetching more products:', error);
          }
          return;
        }
        setProducts(cachedProducts);
        return;
      }

      try {
        await dispatch(
          getCollectionDetails({
            collectionId: configToRender.collectionTarget.value,
            first: requestedCount,
          }),
        ).unwrap();
      } catch (error) {
        console.error('Error fetching collection products:', error);
      }
    };

    fetchProducts();
  }, [configToRender?.collectionTarget?.value, configToRender?.productsCount, cachedProducts, dispatch]);

  const onViewAll = () => {
    // Handle view all navigation
    console.log('View all clicked:', configToRender?.collectionTarget);
  };

  return (
    <InlineGrid gap={'200'}>
      <InlineStack align="space-between" blockAlign="center">
        <span style={{ color: '#FFFFFF' }}>
          {configToRender?.title || 'New Arrival'}{' '}
          {configToRender?.collectionTarget?.label ? `(${configToRender.collectionTarget.label})` : ''}
        </span>
        <button
          onClick={onViewAll}
          type="button"
          style={{
            color: '#528F65',
            textDecoration: 'none',
            fontSize: '12px',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
        >
          View All
        </button>
      </InlineStack>

      <InlineStack gap={'300'}>
        {(() => {
          const requestedCount = Number(configToRender?.productsCount) || 4;
          const actualProducts = products.slice(0, requestedCount);
          const placeholdersNeeded = requestedCount - actualProducts.length;

          return [
            ...actualProducts.map((product) => (
              <Box width="calc(50% - 6px)" key={product.id}>
                <InlineGrid gap={'100'}>
                  {product.image ? (
                    <div
                      style={{
                        width: '100%',
                        height: '160px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  ) : (
                    <PlaceholderImage height="160px" width="100%" text={product.title} />
                  )}
                  <InlineGrid>
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {product.title}
                    </span>
                    <span style={{ fontSize: '12px', color: '#528F65' }}>{product.price}</span>
                  </InlineGrid>
                </InlineGrid>
              </Box>
            )),
            ...Array(placeholdersNeeded)
              .fill(0)
              .map((_, i) => (
                <Box width="calc(50% - 6px)" key={`placeholder-${i}`}>
                  <InlineGrid gap={'100'}>
                    <span
                      style={{
                        minWidth: '100%',
                        height: '160px',
                        background: '#f1f1f1',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src="/imagePlaceholder.svg"
                        alt="Banner Preview"
                        style={{
                          width: '48px',
                          height: '44px',
                        }}
                      />
                    </span>
                    <InlineGrid>
                      <span
                        style={{
                          fontSize: '13px',
                          color: '#fff',
                          display: 'flex',
                        }}
                      >
                        Product name
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#528F65',
                          display: 'flex',
                        }}
                      >
                        Price
                      </span>
                    </InlineGrid>
                  </InlineGrid>
                </Box>
              )),
          ];
        })()}
      </InlineStack>
    </InlineGrid>
  );
}
