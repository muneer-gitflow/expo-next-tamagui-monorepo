import { Box, Text, InlineGrid, InlineStack, Badge, Icon } from '@shopify/polaris';
import {
  LogoFacebookIcon,
  LogoInstagramIcon,
  LogoXIcon,
  LogoYoutubeIcon,
  LogoTiktokIcon,
} from '@shopify/polaris-icons';

export default function TextPara() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <InlineStack align="center" gap={'200'}>
          <Text fontWeight="semibold" as="span" variant="bodyMd">
            PARAGRAPH TITLE
          </Text>
          <Text as="span" variant="bodyXs" alignment="center">
            Text paragraph block helps you add written content to your app, useful for providing information,
            instructions, promotions, about us sections, and contact details.
          </Text>
        </InlineStack>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Text paragraph
        </Text>
        <Badge>General</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
