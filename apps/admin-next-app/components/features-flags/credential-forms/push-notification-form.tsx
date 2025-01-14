import { Box, BlockStack, TextField, Button, Text, Banner, InlineStack, Link, Icon } from '@shopify/polaris';
import { ExternalIcon } from '@shopify/polaris-icons';

export function PushNotificationForm() {
  return (
    <Box padding="400">
      <BlockStack gap="400">
        <Banner tone="info">
          <Text as="p">Configure push notifications for both iOS and Android platforms.</Text>
        </Banner>

        <BlockStack gap="400">
          <Box>
            <InlineStack gap="200" align="space-between">
              <Text as="h3" variant="headingSm">
                Firebase Cloud Messaging (Android)
              </Text>
              <Link url="https://console.firebase.google.com" external>
                Firebase Console
                <Icon source={ExternalIcon} />
              </Link>
            </InlineStack>
            <Box paddingBlockStart="300">
              <TextField
                label="FCM Server Key"
                type="password"
                helpText="Found in Firebase Console > Project Settings > Cloud Messaging"
                autoComplete="off"
              />
            </Box>
          </Box>

          <Box>
            <InlineStack gap="200" align="space-between">
              <Text as="h3" variant="headingSm">
                Apple Push Notification (iOS)
              </Text>
              <Link url="https://developer.apple.com/account/resources/certificates/list" external>
                Apple Developer Console
                <Icon source={ExternalIcon} />
              </Link>
            </InlineStack>
            <Box paddingBlockStart="300">
              <TextField
                label="Upload .p8 Key File"
                type="file"
                helpText="Apple Push Notification Authentication Key"
                autoComplete="off"
              />
              <Box paddingBlockStart="200">
                <TextField label="Key ID" helpText="The 10-character key identifier" autoComplete="off" />
              </Box>
              <Box paddingBlockStart="200">
                <TextField label="Team ID" helpText="Your Apple Developer Team ID" autoComplete="off" />
              </Box>
            </Box>
          </Box>

          <Button variant="primary">Save Credentials</Button>
        </BlockStack>
      </BlockStack>
    </Box>
  );
}
