import { Box, Text, InlineGrid, InlineStack, Badge, TextField } from '@shopify/polaris';

export default function BannerImage() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <Box background="bg">
          <InlineStack blockAlign="center" align="center">
            <img width="100" src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png" />
            <Box position="absolute"></Box>
          </InlineStack>
        </Box>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Banner Image
        </Text>
        <Badge>General</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
