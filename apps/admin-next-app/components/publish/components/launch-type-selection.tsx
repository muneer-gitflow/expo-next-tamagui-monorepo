import { Box, Card, Text, Banner, RadioButton, List } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';

export function LaunchTypeSelection() {
  const { state, dispatch } = usePublish();
  const { wizard } = state;

  return (
    <Box padding="400">
      <Text as="h2" variant="headingMd">Choose Launch Strategy</Text>

      <Box paddingBlockStart="400">
        <Banner tone="info">
          <Text as="p">
            Choose how you want to launch your app. Beta testing helps gather feedback before a full launch.
          </Text>
        </Banner>
      </Box>

      <Box paddingBlockStart="400">
        <Card>
          <Box padding="400">
            <RadioButton
              label="Beta Launch First"
              checked={wizard.launchType === 'beta'}
              onChange={() =>
                dispatch({
                  type: 'UPDATE_WIZARD',
                  payload: { launchType: 'beta' },
                })
              }
              helpText="Test with a limited audience before public launch"
            />
            <Box paddingBlockStart="400">
              <List>
                <List.Item>Gather early user feedback</List.Item>
                <List.Item>Identify and fix issues</List.Item>
                <List.Item>Test with up to 10,000 users</List.Item>
                <List.Item>Typically 2-4 weeks duration</List.Item>
              </List>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box paddingBlockStart="400">
        <Card>
          <Box padding="400">
            <RadioButton
              label="Direct Production Launch"
              checked={wizard.launchType === 'production'}
              onChange={() =>
                dispatch({
                  type: 'UPDATE_WIZARD',
                  payload: { launchType: 'production' },
                })
              }
              helpText="Launch directly to all users"
            />
            <Box paddingBlockStart="400">
              <List>
                <List.Item>Immediate public availability</List.Item>
                <List.Item>Faster time to market</List.Item>
                <List.Item>Full store visibility</List.Item>
                <List.Item>Standard review process</List.Item>
              </List>
            </Box>
          </Box>
        </Card>
      </Box>

      {wizard.launchType === 'beta' && (
        <Box paddingBlockStart="400">
          <Banner tone="success">
            <Text as="p">
              Beta testing is recommended for new apps. You'll be able to configure beta testing options in the next steps.
            </Text>
          </Banner>
        </Box>
      )}
    </Box>
  );
} 