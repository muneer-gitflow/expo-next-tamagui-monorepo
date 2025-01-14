import { Badge, Box, DescriptionList, Icon, InlineGrid, InlineStack } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import { Link } from '@remix-run/react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';

interface Props {
  blockId: string;
  isActive: boolean;
}

export default function ProductsGridBestRender({ blockId, isActive }: Props) {
  const currentBlockConfig = useSelector((state: RootState) => state?.dnd?.currentBlock?.config);
  const savedConfig = useSelector(
    (state: RootState) => state?.dnd?.droppedComponents?.find((c) => c.block_id === blockId)?.config,
  );

  const configToRender = isActive ? currentBlockConfig : savedConfig;

  return (
    <>
      <InlineGrid gap={'200'}>
        <InlineStack align="space-between" blockAlign="center">
          <span
            style={{
              color: '#FFFFFF',
            }}
          >
            Collections
          </span>
          <Link
            to="#"
            style={{
              color: '#528F65',
              textDecoration: 'none',
              fontSize: '12px',
            }}
          >
            View All
          </Link>
        </InlineStack>
        <InlineStack gap={'300'}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Box width="calc(50% - 6px)" key={i}>
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
          ))}
        </InlineStack>
      </InlineGrid>
    </>
  );
}
