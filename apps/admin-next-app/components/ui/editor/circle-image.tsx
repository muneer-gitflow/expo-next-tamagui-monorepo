import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function CircleImage({ text }: { text: boolean }) {
  return (
    <>
      <InlineGrid gap={'200'}>
        <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100" width="100%">
          <InlineStack blockAlign="center" align="center" gap={'200'}>
            <InlineGrid gap={'100'} alignItems="center">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f1f1',
                  height: '55px',
                  width: '55px',
                  borderRadius: '100%',
                }}
              >
                <img
                  width="50"
                  alt="sample-image"
                  src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
                />
              </div>
              {text && (
                <Text alignment="center" variant="bodyMd" as="span">
                  Text
                </Text>
              )}
            </InlineGrid>
            <InlineGrid gap={'100'} alignItems="center">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f1f1',
                  height: '55px',
                  width: '55px',
                  borderRadius: '100%',
                }}
              >
                <img width="50" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </div>
              {text && (
                <Text alignment="center" variant="bodyMd" as="span">
                  Text
                </Text>
              )}
            </InlineGrid>
            <InlineGrid gap={'100'} alignItems="center">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f1f1',
                  height: '55px',
                  width: '55px',
                  borderRadius: '100%',
                }}
              >
                <img width="50" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </div>
              {text && (
                <Text alignment="center" variant="bodyMd" as="span">
                  Text
                </Text>
              )}
            </InlineGrid>
            <InlineGrid gap={'100'} alignItems="center">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f1f1',
                  height: '55px',
                  width: '55px',
                  borderRadius: '100%',
                }}
              >
                <img width="50" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </div>
              {text && (
                <Text alignment="center" variant="bodyMd" as="span">
                  Text
                </Text>
              )}
            </InlineGrid>
          </InlineStack>
        </Box>
        <InlineStack align="space-between">
          <Text fontWeight="medium" variant="bodyMd" as="span">
            Circle image slider with {text && 'Text'}
          </Text>
          <Badge>General</Badge>
        </InlineStack>
      </InlineGrid>
    </>
  );
}
