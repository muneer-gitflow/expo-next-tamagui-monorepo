import { Box, Card, Text, RadioButton, Banner } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';

export function StoreSelection() {
  const { state, dispatch } = usePublish();
  const { wizard } = state;

  return (
    <Box padding="400">
      <Text as="h2" variant="headingMd">
        Select Target Stores
      </Text>

      <Box paddingBlockStart="400">
        <Banner tone="info">
          <Text as="p">
            Choose where you want to publish your app. You can publish to both stores or start with one.
          </Text>
        </Banner>
      </Box>

      <Box paddingBlockStart="400">
        <Card>
          <Box padding="400">
            <RadioButton
              label="Both App Store and Play Store"
              checked={wizard.storeType === 'both'}
              onChange={() =>
                dispatch({
                  type: 'UPDATE_WIZARD',
                  payload: { storeType: 'both' },
                })
              }
              helpText="Reach users on both iOS and Android platforms"
            />
          </Box>
        </Card>
      </Box>

      <Box paddingBlockStart="400">
        <Card>
          <Box padding="400">
            <RadioButton
              label="App Store Only"
              checked={wizard.storeType === 'ios-only'}
              onChange={() =>
                dispatch({
                  type: 'UPDATE_WIZARD',
                  payload: { storeType: 'ios-only' },
                })
              }
              helpText="Publish only to iOS users"
            />
          </Box>
        </Card>
      </Box>

      <Box paddingBlockStart="400">
        <Card>
          <Box padding="400">
            <RadioButton
              label="Play Store Only"
              checked={wizard.storeType === 'android-only'}
              onChange={() =>
                dispatch({
                  type: 'UPDATE_WIZARD',
                  payload: { storeType: 'android-only' },
                })
              }
              helpText="Publish only to Android users"
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
