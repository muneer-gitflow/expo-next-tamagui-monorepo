import { Box, Text, InlineGrid, InlineStack, Badge, Icon } from '@shopify/polaris';
import {
  LogoFacebookIcon,
  LogoInstagramIcon,
  LogoXIcon,
  LogoYoutubeIcon,
  LogoTiktokIcon,
} from '@shopify/polaris-icons';

export default function Social() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <InlineStack align="center" blockAlign="center" gap={'200'}>
          <Icon source={LogoFacebookIcon} tone="base" />
          <Icon source={LogoInstagramIcon} tone="base" />
          <Icon source={LogoXIcon} tone="base" />
          <Icon source={LogoYoutubeIcon} tone="base" />
          <Icon source={LogoTiktokIcon} tone="base" />
        </InlineStack>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Social
        </Text>
        <Badge>General</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
