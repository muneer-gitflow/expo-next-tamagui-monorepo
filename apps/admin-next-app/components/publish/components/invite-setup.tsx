import { Box, Card, Text, Banner, List, Link, InlineStack, Icon, Button } from '@shopify/polaris';
import { ExternalIcon } from '@shopify/polaris-icons';
import { usePublish } from '../context/PublishContext';

export function InviteSetup() {
  const { state } = usePublish();
  const { wizard } = state;

  return (
    <Box padding="400">
      <Text as="h2" variant="headingMd">Developer Account Access</Text>

      <Box paddingBlockStart="400">
        <Banner tone="info">
          <Text as="p">
            To publish through your accounts, we'll need to be invited as collaborators. Follow the steps below.
          </Text>
        </Banner>
      </Box>

      {(wizard.storeType === 'both' || wizard.storeType === 'ios-only') && (
        <Box paddingBlockStart="400">
          <Card>
            <Box padding="400">
              <Text as="h3" variant="headingSm">App Store Connect</Text>
              <Box paddingBlockStart="400">
                <List>
                  <List.Item>
                    Sign in to{' '}
                    <Link url="https://appstoreconnect.apple.com" external>
                      App Store Connect
                      <Icon source={ExternalIcon} />
                    </Link>
                  </List.Item>
                  <List.Item>Go to Users and Access</List.Item>
                  <List.Item>Click the + button to invite a user</List.Item>
                  <List.Item>Enter our email: developer@ourcompany.com</List.Item>
                  <List.Item>Select "Admin" role for full publishing access</List.Item>
                </List>
              </Box>
            </Box>
          </Card>
        </Box>
      )}

      {(wizard.storeType === 'both' || wizard.storeType === 'android-only') && (
        <Box paddingBlockStart="400">
          <Card>
            <Box padding="400">
              <Text as="h3" variant="headingSm">Google Play Console</Text>
              <Box paddingBlockStart="400">
                <List>
                  <List.Item>
                    Sign in to{' '}
                    <Link url="https://play.google.com/console" external>
                      Google Play Console
                      <Icon source={ExternalIcon} />
                    </Link>
                  </List.Item>
                  <List.Item>Go to Users and permissions</List.Item>
                  <List.Item>Click Invite new users</List.Item>
                  <List.Item>Enter our email: developer@ourcompany.com</List.Item>
                  <List.Item>Grant "Admin" access level</List.Item>
                </List>
              </Box>
            </Box>
          </Card>
        </Box>
      )}

      <Box paddingBlockStart="400">
        <Banner tone="success">
          <InlineStack gap="400" align="start">
            <Text as="h3" variant="headingSm">Need assistance?</Text>
            <Text as="p">
              Our team can guide you through the invitation process. Contact support for help.
            </Text>
            <Button variant="plain">Contact Support</Button>
          </InlineStack>
        </Banner>
      </Box>
    </Box>
  );
} 