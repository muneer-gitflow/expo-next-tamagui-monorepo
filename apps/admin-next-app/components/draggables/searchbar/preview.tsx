import { Box, Text, InlineGrid, InlineStack, TextField } from '@shopify/polaris';

export default function SearchBarPreview({ blockId }: { blockId: string }) {
  return (
    <InlineGrid gap="200">
      <div
        style={{
          margin: '-10px -10px 0 -10px',
        }}
      >
        <Box borderBlockEndWidth="0165" padding={'300'} borderColor="border-brand">
          <InlineGrid gap={'200'}>
            <Text variant="headingMd" as="h1">
              Blocks inventory
            </Text>
            <Text variant="bodySm" tone="subdued" as="span">
              Drag, drop max 5 blocks per design.
            </Text>
            <TextField label="" placeholder="Search block" autoComplete="off" />
          </InlineGrid>
        </Box>
      </div>
    </InlineGrid>
  );
}
