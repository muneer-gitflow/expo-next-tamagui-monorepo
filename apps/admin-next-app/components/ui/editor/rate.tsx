import { Box, Text, InlineGrid, InlineStack, Badge, TextField, Icon } from '@shopify/polaris';
import { StarFilledIcon } from '@shopify/polaris-icons';

export default function Rate() {
  return (
    <InlineGrid gap={'200'}>
      <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
        <Box background="bg" padding={'200'}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifySelf: 'center',
            }}
          >
            <Icon source={StarFilledIcon} tone="base" />
            <Text variant="bodyMd" as="span" alignment="center">
              Rate-us button label
            </Text>
          </div>
        </Box>
      </Box>
      <InlineStack align="space-between">
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Rate us
        </Text>
        <Badge tone="info">Advanced</Badge>
      </InlineStack>
    </InlineGrid>
  );
}
