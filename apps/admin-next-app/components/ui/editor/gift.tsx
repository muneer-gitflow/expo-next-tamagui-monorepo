import { Box, Text, InlineGrid, InlineStack, Badge, TextField, Icon } from '@shopify/polaris';

export default function Gift() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <InlineGrid alignItems="center" gap="200" columns={2}>
          <InlineGrid gap={'200'}>
            <Box background="bg" position="relative">
              <InlineStack blockAlign="center" align="center">
                <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </InlineStack>
            </Box>
            <InlineGrid>
              <Text as="span" variant="bodySm" fontWeight="semibold">
                Product name
              </Text>
              <Text tone="subdued" as="span" textDecorationLine="line-through" variant="bodySm" fontWeight="semibold">
                $99.99
              </Text>
              <Text as="span" variant="bodySm" fontWeight="semibold">
                $0
              </Text>
            </InlineGrid>
            <button
              style={{
                background: '#000',
                color: '#fff',
                height: '28px',
                width: '100%',
                fontSize: '12px',
                border: 'none',
              }}
            >
              Add to Cart
            </button>
          </InlineGrid>
          <InlineGrid gap={'200'}>
            <Box background="bg" position="relative">
              <InlineStack blockAlign="center" align="center">
                <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </InlineStack>
            </Box>
            <InlineGrid>
              <Text as="span" variant="bodySm" fontWeight="semibold">
                Product name
              </Text>
              <Text tone="subdued" as="span" textDecorationLine="line-through" variant="bodySm" fontWeight="semibold">
                $99.99
              </Text>
              <Text as="span" variant="bodySm" fontWeight="semibold">
                $0
              </Text>
            </InlineGrid>
            <button
              style={{
                background: '#000',
                color: '#fff',
                height: '28px',
                width: '100%',
                fontSize: '12px',
                border: 'none',
              }}
            >
              Add to Cart
            </button>
          </InlineGrid>
        </InlineGrid>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Gift
        </Text>
        <Badge tone="info">Advanced</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
