import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function Navigation() {
  return (
    <InlineGrid gap={'200'}>
      <Box
        borderWidth="0165"
        borderColor="border-brand"
        padding={'200'}
        borderRadius="100"
        overflowX="hidden"
        width="100%"
      >
        <InlineStack blockAlign="center" align="space-between" gap={'200'}>
          <InlineGrid gap={'100'} alignItems="center">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f1f1f1',
                height: '55px',
                width: '55px',
              }}
            >
              <img
                width="50"
                alt="sample-image"
                src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
              />
            </div>
            <Text alignment="center" variant="bodyMd" as="span">
              Link
            </Text>
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
              }}
            >
              <img
                width="50"
                alt="sample-image"
                src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
              />
            </div>
            <Text alignment="center" variant="bodyMd" as="span">
              Link
            </Text>
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
              }}
            >
              <img
                width="50"
                alt="sample-image"
                src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
              />
            </div>
            <Text alignment="center" variant="bodyMd" as="span">
              Link
            </Text>
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
              }}
            >
              <img
                width="50"
                alt="sample-image"
                src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
              />
            </div>
            <Text alignment="center" variant="bodyMd" as="span">
              Link
            </Text>
          </InlineGrid>
        </InlineStack>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Navigations
        </Text>
        <Badge>General</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
