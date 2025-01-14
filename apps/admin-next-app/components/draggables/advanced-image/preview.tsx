import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function AdvanceImagePreview() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <InlineGrid alignItems="center" gap="200" columns={2}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f1f1f1',
              height: '100%',
            }}
          >
            <img
              alt="sample-image"
              width="100"
              src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
            />
          </div>
          <InlineGrid gap={'200'}>
            <Box background="bg">
              <InlineStack blockAlign="center" align="center">
                <img
                  alt="sample-image"
                  width="100"
                  src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
                />
              </InlineStack>
            </Box>
            <Box background="bg">
              <InlineStack blockAlign="center" align="center">
                <img
                  alt="sample-image"
                  width="100"
                  src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
                />
              </InlineStack>
            </Box>
          </InlineGrid>
        </InlineGrid>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Advanced image slider
        </Text>
        <Badge tone="info">Advanced</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
