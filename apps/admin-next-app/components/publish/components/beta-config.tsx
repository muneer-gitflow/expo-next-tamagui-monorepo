import { Box, Card, Text, FormLayout, TextField, Select, Banner, List, InlineStack, Button } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';

interface BetaGroup {
  name: string;
  emails: string[];
}

interface BetaConfig {
  type: 'closed' | 'open';
  maxTesters: number;
  duration: string;
  testGroups: BetaGroup[];
  feedbackCollection: {
    inAppFeedback: boolean;
    emailCollection: boolean;
    customSurveyUrl?: string;
  };
}

export function BetaConfig() {
  const { state, dispatch } = usePublish();
  const { metadata } = state;

  const handleBetaConfigUpdate = (field: keyof BetaConfig, value: any) => {
    dispatch({
      type: 'UPDATE_METADATA',
      payload: {
        betaConfig: {
          ...metadata.betaConfig,
          [field]: value,
        },
      },
    });
  };

  const handleGroupUpdate = (index: number, field: keyof BetaGroup, value: string | string[]) => {
    const newGroups = [...(metadata.betaConfig?.testGroups || [])];
    newGroups[index] = {
      ...newGroups[index],
      [field]: field === 'emails' ? (value as string).split(',').map((email) => email.trim()) : value,
    };
    handleBetaConfigUpdate('testGroups', newGroups);
  };

  const addTestGroup = () => {
    const newGroups = [...(metadata.betaConfig?.testGroups || []), { name: '', emails: [] }];
    handleBetaConfigUpdate('testGroups', newGroups);
  };

  return (
    <Card>
      <Box padding="400">
        <Text as="h2" variant="headingMd">
          Beta Testing Configuration
        </Text>

        <Box paddingBlockStart="400">
          <Banner tone="info">
            <Text as="p">
              Beta testing helps gather feedback and identify issues before public launch. Configure your beta testing
              preferences below.
            </Text>
          </Banner>

          <Box paddingBlockStart="400">
            <FormLayout>
              <Select
                label="Beta Testing Type"
                options={[
                  { label: 'Closed Beta (Invite Only)', value: 'closed' },
                  { label: 'Open Beta (Public)', value: 'open' },
                ]}
                value={metadata.betaConfig?.type || 'closed'}
                onChange={(value) => handleBetaConfigUpdate('type', value)}
                helpText="Choose how you want to distribute your beta"
              />

              <TextField
                label="Maximum Beta Testers"
                type="number"
                value={String(metadata.betaConfig?.maxTesters || 100)}
                onChange={(value) => handleBetaConfigUpdate('maxTesters', parseInt(value, 10))}
                helpText="Maximum number of testers allowed"
              />

              <Select
                label="Beta Duration"
                options={[
                  { label: '1 Week', value: '1w' },
                  { label: '2 Weeks', value: '2w' },
                  { label: '1 Month', value: '1m' },
                  { label: '2 Months', value: '2m' },
                ]}
                value={metadata.betaConfig?.duration || '2w'}
                onChange={(value) => handleBetaConfigUpdate('duration', value)}
              />

              {metadata.betaConfig?.type === 'closed' && (
                <Box paddingBlockStart="400">
                  <InlineStack align="space-between">
                    <Text variant="headingSm">Test Groups</Text>
                    <Button onClick={addTestGroup} variant="plain">
                      Add Group
                    </Button>
                  </InlineStack>

                  {metadata.betaConfig?.testGroups?.map((group, index) => (
                    <Box key={index} paddingBlockStart="400">
                      <FormLayout>
                        <TextField
                          label="Group Name"
                          value={group.name}
                          onChange={(value) => handleGroupUpdate(index, 'name', value)}
                          autoComplete="off"
                        />
                        <TextField
                          label="Tester Emails"
                          value={group.emails.join(', ')}
                          onChange={(value) => handleGroupUpdate(index, 'emails', value)}
                          multiline={3}
                          helpText="Enter email addresses separated by commas"
                          autoComplete="off"
                        />
                      </FormLayout>
                    </Box>
                  ))}
                </Box>
              )}

              <Box paddingBlockStart="400">
                <Text variant="headingSm">Beta Testing Guidelines</Text>
                <Box paddingBlockStart="200">
                  <List>
                    <List.Item>Provide clear instructions to testers</List.Item>
                    <List.Item>Set up proper feedback channels</List.Item>
                    <List.Item>Monitor crash reports and feedback</List.Item>
                    <List.Item>Plan for regular updates during beta</List.Item>
                  </List>
                </Box>
              </Box>

              <Box paddingBlockStart="400">
                <Text variant="headingSm">Feedback Collection</Text>
                <Box paddingBlockStart="400">
                  <TextField
                    label="Custom Feedback Form URL"
                    type="url"
                    value={metadata.betaConfig?.feedbackCollection?.customSurveyUrl || ''}
                    onChange={(value) =>
                      handleBetaConfigUpdate('feedbackCollection', {
                        ...metadata.betaConfig?.feedbackCollection,
                        customSurveyUrl: value,
                      })
                    }
                    helpText="Optional: Add a custom survey for beta testers"
                    autoComplete="off"
                  />
                </Box>
              </Box>
            </FormLayout>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
