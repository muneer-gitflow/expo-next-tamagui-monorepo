import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function Video() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <Box background="bg">
          <InlineStack blockAlign="center" align="center">
            <img width="100%" src="https://onemobile.onecommerce.io/assets/video-sample-BZwDOiss.png" />
            <Box position="absolute"></Box>
          </InlineStack>
        </Box>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Video
        </Text>
        <Badge>General</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
