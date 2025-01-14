import { Box, Text, InlineGrid, InlineStack } from '@shopify/polaris';

export default function ProductsGridPaginatedPreview({ blockId }: { blockId: string }) {
  return (
    <InlineGrid gap="200">
      <Box borderWidth="025" padding={'300'} borderColor="border" borderRadius="200">
        <InlineGrid gap={'300'}>
          <InlineStack gap={'300'}>
            {Array.from({ length: 4 }).map((_, i) => (
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
                    <Text fontWeight="medium" variant="bodySm" as="span">
                      Product name
                    </Text>
                    <Text variant="bodySm" tone="subdued" as="span">
                      Price
                    </Text>
                  </InlineGrid>
                </InlineGrid>
              </Box>
            ))}
          </InlineStack>
          <InlineGrid>
            <Text fontWeight="medium" variant="bodyMd" as="span">
              Products Grid Paginated
            </Text>
            <Text variant="bodySm" tone="subdued" as="span">
              List of products with pagination
            </Text>
          </InlineGrid>
        </InlineGrid>
      </Box>
    </InlineGrid>
  );
}
