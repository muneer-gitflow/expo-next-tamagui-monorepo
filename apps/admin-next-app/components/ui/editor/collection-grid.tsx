import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function CollectioncardGrid() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <InlineGrid alignItems="center" gap="200" columns={2}>
          <InlineGrid gap={'200'}>
            <Box background="bg" position="relative">
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
                  Circle image slider
                </Text>
              </div>
              <InlineStack blockAlign="center" align="center">
                <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </InlineStack>
            </Box>
            <Box background="bg" position="relative">
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
                  Circle image slider
                </Text>
              </div>
              <InlineStack blockAlign="center" align="center">
                <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </InlineStack>
            </Box>
          </InlineGrid>
          <InlineGrid gap={'200'}>
            <Box background="bg" position="relative">
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
                  Circle image slider
                </Text>
              </div>
              <InlineStack blockAlign="center" align="center">
                <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </InlineStack>
            </Box>
            <Box background="bg" position="relative">
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
                  Circle image slider
                </Text>
              </div>

              <InlineStack blockAlign="center" align="center">
                <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </InlineStack>
            </Box>
          </InlineGrid>
        </InlineGrid>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Collection grid
        </Text>
        <Badge tone="info">Advanced</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
