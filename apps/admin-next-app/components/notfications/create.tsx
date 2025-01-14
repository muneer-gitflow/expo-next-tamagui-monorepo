import React from 'react';
import {
  Page,
  Box,
  Card,
  Text,
  BlockStack,
  Button,
  TextField,
  ButtonGroup,
  Banner,
  InlineStack,
  Divider,
  Grid,
} from '@shopify/polaris';
import { Link } from '@remix-run/react';
import NavigationTarget from './navigation-target';

export default function CreateNotification() {
  const shortcodes = [
    { code: 'first_name', label: 'first_name' },
    { code: 'last_name', label: 'last_name' },
    { code: 'store_url', label: 'store_url' },
    { code: 'email', label: 'email' },
    { code: 'phone', label: 'phone' },
  ];

  const commonEmojis = ['😊', '😃', '💰', '⚡', '❤️', '👍', '😍'];

  return (
    <Page
      backAction={{
        content: 'Manual push notification',
        url: '/app/notification/create',
      }}
      title="Manual push notification"
      primaryAction={<Button variant="primary">Send</Button>}
    >
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 8, xl: 8 }}>
          <BlockStack gap="500">
            <Banner
              title="Feature available from Starter plan"
              action={{ content: 'Upgrade to Starter' }}
              secondaryAction={{ content: 'View plans' }}
            >
              <p>
                Looks like you're interested in this feature. Upgrade now to access advanced tools and drive growth.
              </p>
            </Banner>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Push notification
                </Text>

                <BlockStack gap="400">
                  <Box>
                    <TextField
                      label="Title"
                      placeholder="E.g., 🔥 Prices Just Dropped!"
                      autoComplete="off"
                      maxLength={40}
                      showCharacterCount
                    />
                    <Box paddingBlockStart="300">
                      <Text variant="bodyMd" as="p" color="subdued">
                        Common emojis and shortcodes
                      </Text>
                      <Box paddingBlockStart="200">
                        <InlineStack gap="200" wrap>
                          {commonEmojis.map((emoji) => (
                            <Button key={emoji} variant="tertiary" size="slim">
                              {emoji}
                            </Button>
                          ))}
                        </InlineStack>
                      </Box>
                      <Box paddingBlockStart="200">
                        <ButtonGroup variant="segmented">
                          {shortcodes.map((code) => (
                            <Button key={code.code} size="slim">
                              {code.label}
                            </Button>
                          ))}
                        </ButtonGroup>
                      </Box>
                    </Box>
                  </Box>

                  <Divider />

                  <Box>
                    <TextField
                      label="Message body"
                      placeholder="E.g., Don't miss out on these limited-time deals. Up to 70% off. Shop now and save big!"
                      autoComplete="off"
                      maxLength={200}
                      multiline={3}
                      showCharacterCount
                    />
                    <Box paddingBlockStart="300">
                      <Text variant="bodyMd" as="p" color="subdued">
                        Common emojis and shortcodes
                      </Text>
                      <Box paddingBlockStart="200">
                        <InlineStack gap="200" wrap>
                          {commonEmojis.map((emoji) => (
                            <Button key={emoji} variant="tertiary" size="slim">
                              {emoji}
                            </Button>
                          ))}
                        </InlineStack>
                      </Box>
                      <Box paddingBlockStart="200">
                        <ButtonGroup variant="segmented">
                          {shortcodes.map((code) => (
                            <Button key={code.code} size="slim">
                              {code.label}
                            </Button>
                          ))}
                        </ButtonGroup>
                      </Box>
                    </Box>
                  </Box>

                  <Divider />

                  <Box>
                    <Text variant="headingMd" as="h3">
                      Image (Optional)
                    </Text>
                    <Box paddingBlockStart="200">
                      <Button>Upload image</Button>
                      <Box paddingBlockStart="200">
                        <Text variant="bodyMd" as="p" color="subdued">
                          Recommended ratio: 1,440x720 px.
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </BlockStack>
              </BlockStack>
            </Card>

            <NavigationTarget />
          </BlockStack>
        </Grid.Cell>

        <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Preview
              </Text>
              <Box minHeight="500px" background="bg-surface-secondary" borderRadius="200" padding="400">
                <Box background="bg-surface" minHeight="400px" borderRadius="300" border="base" padding="400">
                  {/* Placeholder for simulator */}
                  <Text alignment="center" as="p" variant="bodyMd" color="subdued">
                    Notification Preview
                  </Text>
                </Box>
                <Box paddingBlockStart="300" alignment="center">
                  <Button variant="tertiary" size="slim">
                    Send test
                  </Button>
                </Box>
              </Box>
            </BlockStack>
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
