import { Box, Card, Text, RadioButton, List, Banner, Link, Icon } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';
import { ExternalIcon } from '@shopify/polaris-icons';

export function InitialChoice() {
  const { state, dispatch } = usePublish();
  const { wizard } = state;

  return (
    <Box padding="400">
      <Text as="h2" variant="headingMd">
        Choose Publishing Method
      </Text>

      <Box paddingBlockStart="400">
        <Banner tone="info">
          <Text as="p">
            Select how you'd like to publish your app to the App Store and Play Store. This choice affects the publishing
            process and app ownership.
          </Text>
        </Banner>
      </Box>

      <Box paddingBlockStart="400">
        <Card>
          <Box padding="400">
            <RadioButton
              label="Publish through our account"
              checked={wizard.path === 'our-account'}
              onChange={() =>
                dispatch({
                  type: 'UPDATE_WIZARD',
                  payload: { path: 'our-account' },
                })
              }
              helpText="We'll handle the entire publishing process using our developer accounts. Fastest option to go live."
            />
            <Box paddingBlockStart="400">
              <List>
                <List.Item>No developer account needed</List.Item>
                <List.Item>Faster publishing process</List.Item>
                <List.Item>We handle all technical requirements</List.Item>
              </List>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box paddingBlockStart="400">
        <Card>
          <Box padding="400">
            <RadioButton
              label="Publish through your account"
              checked={wizard.path === 'client-account'}
              onChange={() =>
                dispatch({
                  type: 'UPDATE_WIZARD',
                  payload: { path: 'client-account' },
                })
              }
              helpText="We'll publish using your developer accounts. You maintain full ownership and control."
            />
            <Box paddingBlockStart="400">
              <List>
                <List.Item>Full ownership of app listing</List.Item>
                <List.Item>Direct access to analytics</List.Item>
                <List.Item>Complete control over publishing</List.Item>
              </List>
            </Box>
          </Box>
        </Card>
      </Box>

      {wizard.path === 'client-account' && (
        <Box paddingBlockStart="400">
          <Card>
            <Box padding="400">
              <Text as="h3" variant="headingSm">
                Required Developer Accounts
              </Text>
              <Box paddingBlockStart="400">
                <List>
                  <List.Item>
                    <Link url="https://developer.apple.com/programs/" external>
                      Apple Developer Program
                      <Icon source={ExternalIcon} />
                    </Link>{' '}
                    ($99/year)
                  </List.Item>
                  <List.Item>
                    <Link url="https://play.google.com/console/signup" external>
                      Google Play Console
                      <Icon source={ExternalIcon} />
                    </Link>{' '}
                    ($25 one-time)
                  </List.Item>
                </List>
              </Box>
            </Box>
          </Card>

          <Box paddingBlockStart="400">
            <Banner tone="warning">
              <Text as="p">
                Important: You'll need to invite admin@gitspark.com as an administrator to both developer accounts. We'll
                guide you through this process in the next steps.
              </Text>
            </Banner>
          </Box>
        </Box>
      )}
    </Box>
  );
}
