import { Box, Text, InlineGrid, InlineStack, Badge } from '@shopify/polaris';

export default function CollectioncardSlider() {
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
              justifyContent: 'center',
              background: '#f1f1f1',
              maxWidth: '170px',
              minWidth: '170px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                background: 'rgba(0,0,0,0.6)',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              Collection Title
            </div>
            <img
              width="100"
              alt="sample-image"
              src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f1f1f1',
              maxWidth: '170px',
              minWidth: '170px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                background: 'rgba(0,0,0,0.6)',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              Collection Title
            </div>
            <img
              width="100"
              alt="sample-image"
              src="https://onemobile.onecommerce.io/assets/sample-image-7Rj1TtpF.png"
            />
          </div>
        </div>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Collection card slider
        </Text>
        <Badge>General</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
