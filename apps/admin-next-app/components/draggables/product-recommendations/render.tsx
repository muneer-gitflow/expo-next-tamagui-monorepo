import { Box, Icon, InlineGrid, InlineStack } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import { Link } from '@remix-run/react';

export default function ProductRecommendationsRender({ blockId }: { blockId: string }) {
  return (
    <>
      <InlineStack align="space-between" blockAlign="center">
        <span
          style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: '700',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '10px',
          }}
        >
          You May Also Like
          <Link
            to="#"
            style={{
              color: '#528F65',
              display: 'flex',
              fontWeight: 'normal',
            }}
          >
            View All <Icon source={ArrowRightIcon} tone="success" />
          </Link>
        </span>
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
    </>
  );
}
