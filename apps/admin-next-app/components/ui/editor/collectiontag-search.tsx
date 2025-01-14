import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function CollectiontagSearch() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <InlineGrid alignItems="center" gap="200" columns={1}>
          <InlineGrid gap={'200'}>
            <Box background="bg" position="relative">
              <div
                style={{
                  position: 'absolute',
                  height: '6px',
                  bottom: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '5px',
                  zIndex: '1',
                  width: ' 100%',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    background: '#f1f1f1',
                    borderRadius: '100%',
                  }}
                ></span>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    background: '#f1f1f1',
                    borderRadius: '100%',
                  }}
                ></span>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    background: '#f1f1f1',
                    borderRadius: '100%',
                  }}
                ></span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  background: 'rgba(0,0,0,0.7)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text fontWeight="medium" variant="bodyMd" tone="text-inverse" as="span" alignment="center">
                  Collection Title
                </Text>
              </div>
              <InlineStack blockAlign="center" align="center">
                <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" alt="" />
              </InlineStack>
            </Box>
          </InlineGrid>
        </InlineGrid>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Collection card stack
        </Text>
        <Badge tone="info">Advanced</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
