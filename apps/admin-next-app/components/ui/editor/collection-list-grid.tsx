import { Box, Text, InlineGrid, InlineStack, Badge, TextField, Icon } from '@shopify/polaris';

export default function CollectionlistGrid() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <InlineGrid gap={'200'} columns={2}>
          <Box>
            <InlineGrid gap={'200'}>
              <Box
                borderColor="border"
                borderWidth="0165"
                padding={'200'}
                paddingInlineStart={'200'}
                paddingInlineEnd={'200'}
              >
                <InlineStack align="space-between" blockAlign="center">
                  <Text fontWeight="medium" variant="bodyMd" as="span">
                    Collection 1
                  </Text>
                  <img
                    style={{ background: '#f1f1f1' }}
                    width={'24px'}
                    src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
                  />
                </InlineStack>
              </Box>
              <Box
                borderColor="border"
                borderWidth="0165"
                padding={'200'}
                paddingInlineStart={'200'}
                paddingInlineEnd={'200'}
              >
                <InlineStack align="space-between" blockAlign="center">
                  <Text fontWeight="medium" variant="bodyMd" as="span">
                    Collection 2
                  </Text>
                  <img
                    style={{ background: '#f1f1f1' }}
                    width={'24px'}
                    src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
                  />
                </InlineStack>
              </Box>
            </InlineGrid>
          </Box>
          <Box>
            <InlineGrid gap={'200'}>
              <Box
                borderColor="border"
                borderWidth="0165"
                padding={'200'}
                paddingInlineStart={'200'}
                paddingInlineEnd={'200'}
              >
                <InlineStack align="space-between" blockAlign="center">
                  <Text fontWeight="medium" variant="bodyMd" as="span">
                    Collection 1
                  </Text>
                  <img
                    style={{ background: '#f1f1f1' }}
                    width={'24px'}
                    src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
                  />
                </InlineStack>
              </Box>
              <Box
                borderColor="border"
                borderWidth="0165"
                padding={'200'}
                paddingInlineStart={'200'}
                paddingInlineEnd={'200'}
              >
                <InlineStack align="space-between" blockAlign="center">
                  <Text fontWeight="medium" variant="bodyMd" as="span">
                    Collection 2
                  </Text>
                  <img
                    style={{ background: '#f1f1f1' }}
                    width={'24px'}
                    src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
                  />
                </InlineStack>
              </Box>
            </InlineGrid>
          </Box>
        </InlineGrid>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Collection list
        </Text>
        <Badge tone="info">Advanced</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
