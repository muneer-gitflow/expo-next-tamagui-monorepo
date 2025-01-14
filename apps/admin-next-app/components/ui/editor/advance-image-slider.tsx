import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function AdvanceimageSlider() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <InlineStack>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
          <div
            style={{
              width: 'calc(100% / 3)',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img width="80px" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
          </div>
        </InlineStack>
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
