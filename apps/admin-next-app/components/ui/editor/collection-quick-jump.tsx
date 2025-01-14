import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function CollectiongridJump() {
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
        <div style={{ display: 'flex', gap: '10px', overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px',
              border: '#f1f1f1 solid 1px',
              whiteSpace: 'nowrap',
              gap: '5px',
              position: 'relative',
            }}
          >
            <img
              alt="sample-image"
              width="24"
              style={{ background: '#f1f1f1' }}
              src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
            />{' '}
            Collection Title
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px',
              border: '#f1f1f1 solid 1px',
              whiteSpace: 'nowrap',
              gap: '5px',
              position: 'relative',
            }}
          >
            <img
              alt="sample-image"
              width="24"
              style={{ background: '#f1f1f1' }}
              src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
            />{' '}
            Collection Title
          </div>
        </div>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Collection quick jump
        </Text>
        <Badge>General</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
