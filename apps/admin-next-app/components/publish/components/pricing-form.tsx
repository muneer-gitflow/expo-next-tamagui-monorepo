import { Box, FormLayout, Select, TextField, Checkbox, Text, BlockStack } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';

export function PricingForm() {
  const { state, dispatch } = usePublish();
  const { metadata } = state;

  const pricingModels = [
    { label: 'Free', value: 'free' },
    { label: 'Paid', value: 'paid' },
    { label: 'Freemium', value: 'freemium' },
  ];

  const ageRatings = [
    { label: '4+', value: '4+' },
    { label: '9+', value: '9+' },
    { label: '12+', value: '12+' },
    { label: '17+', value: '17+' },
  ];

  return (
    <Box padding="400">
      <FormLayout>
        <Select
          label="Pricing Model"
          options={pricingModels}
          value={metadata.price}
          onChange={(value) =>
            dispatch({
              type: 'UPDATE_METADATA',
              payload: { price: value },
            })
          }
          helpText="Choose how you want to monetize your app"
        />

        {metadata.price !== 'free' && (
          <BlockStack gap="400">
            <TextField
              label="Base Price"
              type="number"
              prefix="$"
              value={metadata.price}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_METADATA',
                  payload: { price: value },
                })
              }
              autoComplete="off"
            />

            {metadata.price === 'freemium' && (
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm">
                  Subscription Options
                </Text>
                <TextField
                  label="Monthly Price"
                  type="number"
                  prefix="$"
                  value={metadata.price}
                  onChange={(value) =>
                    dispatch({
                      type: 'UPDATE_METADATA',
                      payload: { price: value },
                    })
                  }
                  autoComplete="off"
                />
              </BlockStack>
            )}
          </BlockStack>
        )}

        <Box paddingBlockStart="400">
          <Text variant="headingSm">Content Rating</Text>
          <Box paddingBlockStart="400">
            <FormLayout>
              <Select
                label="Age Rating"
                options={ageRatings}
                value={metadata.ageRating}
                onChange={(value) =>
                  dispatch({
                    type: 'UPDATE_METADATA',
                    payload: { ageRating: value },
                  })
                }
              />

              <Checkbox
                label="This app contains advertisements"
                checked={metadata.containsAds}
                onChange={(checked) =>
                  dispatch({
                    type: 'UPDATE_METADATA',
                    payload: { containsAds: checked },
                  })
                }
              />
            </FormLayout>
          </Box>
        </Box>
      </FormLayout>
    </Box>
  );
}
