import { Box, Text, InlineGrid, Button } from '@shopify/polaris';
import { LayoutFooterIcon, ImageIcon, CursorBannerIcon, TextFontIcon } from '@shopify/polaris-icons';

export default function BlocksPicker() {
  return (
    <div
      style={{
        flex: '0 0 316px',
        borderLeft: '1px solid #ccc',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 64px)',
      }}
    >
      <Box borderBlockEndWidth="0165" padding={'400'} borderColor="border-brand">
        <InlineGrid gap={'200'}>
          <Text variant="headingMd" as="h1">
            Branding
          </Text>
          <Text variant="bodySm" tone="subdued" as="span">
            Help your app recognizable and matched with the overall brand.
          </Text>
        </InlineGrid>
      </Box>
      <Box paddingInline={'400'}>
        <InlineGrid gap={'200'}>
          <Button textAlign="left" size="large" variant="tertiary" icon={TextFontIcon}>
            App name
          </Button>
          <Button textAlign="left" size="large" variant="tertiary" icon={LayoutFooterIcon}>
            Header and bottom bar
          </Button>
          <Button textAlign="left" size="large" variant="tertiary" icon={CursorBannerIcon}>
            Primary button
          </Button>
          <Button textAlign="left" size="large" variant="tertiary" icon={ImageIcon}>
            Splash screen
          </Button>
        </InlineGrid>
      </Box>
    </div>
  );
}
