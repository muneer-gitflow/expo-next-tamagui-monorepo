import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function AnnouncementBar() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <Box background="bg" padding={'200'}>
          <Text fontWeight="bold" variant="bodyMd" as="span" alignment="center">
            PROMOTIONS OR UPDATES
          </Text>
        </Box>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Announcement bar
        </Text>
        <Badge tone="info">Advanced</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
