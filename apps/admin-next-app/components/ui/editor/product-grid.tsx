import { Box, Text, InlineGrid, InlineStack, Badge, TextField, Icon } from '@shopify/polaris';

export default function ProductGrid() {
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
              <Text as="span" variant="bodySm">
                Product Title
              </Text>
              <Text as="span" variant="bodySm" fontWeight="bold">
                $99.99
              </Text>
            </InlineGrid>
          </InlineGrid>
          <InlineGrid gap={'200'}>
            <Box background="bg" position="relative">
              <InlineStack blockAlign="center" align="center">
                <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
              </InlineStack>
            </Box>
            <InlineGrid>
              <Text as="span" variant="bodySm">
                Product Title
              </Text>
              <Text as="span" variant="bodySm" fontWeight="bold">
                $99.99
              </Text>
            </InlineGrid>
          </InlineGrid>
        </InlineGrid>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Product grid
        </Text>
        <Badge tone="info">Advanced</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
