import { Box, Text, InlineGrid, TextField } from '@shopify/polaris';

export default function BlocksPickerTitle() {
  return (
    <Box borderBlockEndWidth="0165" padding={'400'} borderColor="border-brand">
      <InlineGrid>
        <Text variant="headingMd" as="h1">
          Blocks inventory
        </Text>
        <Text variant="bodySm" tone="subdued" as="span">
          Drag, drop max 5 blocks per design.
        </Text>
        <Box paddingBlockStart="300">
          <TextField label="" placeholder="Search block" autoComplete="off" />
        </Box>
      </InlineGrid>
    </Box>
  );
}
