import { Box, InlineGrid, InlineStack } from '@shopify/polaris';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/store/store';
import { useEffect, useState } from 'react';
import PlaceholderImage from '@/components/ui/place-holder-image';
import { selectCollectionProducts, getCollectionDetails } from '@/lib/store/reducers/collections.slice';
import { getSimulatorItems } from '@/lib/store/reducers/simulator.slice';

type ProductsGridPaginatedRenderProps = {
  blockId: string;
};

type ProductGridConfigType = {
  title: string;
  collectionTarget: {
    navigationType: 'collection';
    value: string;
    label: string;
  };
  productsCount: string;
};

export default function ProductsGridPaginatedRender({ blockId }: ProductsGridPaginatedRenderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const simulatorItems = getSimulatorItems(useSelector((state: RootState) => state));
  const config = simulatorItems?.find((item: any) => item.block_id === blockId)?.config as ProductGridConfigType;
  const cachedProducts = useSelector((state: RootState) =>
    config?.collectionTarget?.value ? selectCollectionProducts(state, config.collectionTarget.value) : undefined,
  );
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!config?.collectionTarget?.value) return;

      const requestedCount = Number(config?.productsCount) || 4;

      if (cachedProducts) {
        if (cachedProducts.length < requestedCount) {
          try {
            await dispatch(
              getCollectionDetails({
                collectionId: config.collectionTarget.value,
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
            collectionId: config.collectionTarget.value,
            first: requestedCount,
          }),
        ).unwrap();
      } catch (error) {
        console.error('Error fetching collection products:', error);
      }
    };

    fetchProducts();
  }, [config?.collectionTarget?.value, config?.productsCount, cachedProducts, dispatch]);

  return (
    <InlineGrid gap={'200'}>
      <InlineStack gap={'300'}>
        {(() => {
          const requestedCount = Number(config?.productsCount) || 8;
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
