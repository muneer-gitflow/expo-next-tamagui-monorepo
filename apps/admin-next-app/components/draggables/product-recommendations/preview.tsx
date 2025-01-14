import { Box, Text, InlineGrid, InlineStack } from '@shopify/polaris';

export default function ProductRecommendationsPreview({ blockId }: { blockId: string }) {
  return (
    <InlineGrid gap="200">
      <Box borderWidth="025" padding={'300'} borderColor="border" borderRadius="200">
        <Box paddingBlockStart={'300'} paddingBlockEnd={'300'}>
          <Text fontWeight="bold" variant="bodyMd" as="span">
            You may also like
          </Text>
        </Box>
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
                      Product Name
                    </Text>
                  </InlineGrid>
                </InlineGrid>
              </Box>
            ))}
          </InlineStack>
          <InlineGrid>
            <Text fontWeight="medium" variant="bodyMd" as="span">
              Product Recommendations
            </Text>
          </InlineGrid>
        </InlineGrid>
      </Box>
    </InlineGrid>
  );
}
