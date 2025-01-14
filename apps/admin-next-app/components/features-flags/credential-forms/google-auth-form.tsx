import { Box, BlockStack, TextField, Button, Link, Icon, Text, Banner } from '@shopify/polaris';
import { ExternalIcon } from '@shopify/polaris-icons';
import { useFeatures } from '../context/FeaturesContext';
import { useState } from 'react';

export function GoogleAuthForm() {
  const { dispatch } = useFeatures();
  const [credentials, setCredentials] = useState({
    client_id: '',
    client_secret: '',
    redirect_uri: 'https://your-app.com/auth/google/callback',
  });

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_CREDENTIALS',
      payload: {
        id: 'google_auth',
        credentials,
      },
    });
  };

  return (
    <Box padding="400">
      <BlockStack gap="400">
        <Banner tone="info">
          <BlockStack gap="200">
            <Text as="p">
              To enable Google Sign-In, you need to create credentials in the Google Cloud Console.
            </Text>
            <Link url="https://console.cloud.google.com" external>
              Go to Google Cloud Console
              <Icon source={ExternalIcon} />
            </Link>
          </BlockStack>
        </Banner>

        <BlockStack gap="400">
          <TextField
            label="Client ID"
            value={credentials.client_id}
            onChange={(value) => setCredentials((prev) => ({ ...prev, client_id: value }))}
            helpText="From Google Cloud Console OAuth 2.0 credentials"
            autoComplete="off"
          />
          <TextField
            label="Client Secret"
            value={credentials.client_secret}
            onChange={(value) => setCredentials((prev) => ({ ...prev, client_secret: value }))}
            type="password"
            helpText="Keep this secure and never share it"
            autoComplete="off"
          />
          <TextField
            label="Authorized Redirect URI"
            value={credentials.redirect_uri}
            readOnly
            helpText="Add this URI to your Google Cloud Console settings"
            autoComplete="off"
          />
          <Button variant="primary" onClick={handleSave}>Save Credentials</Button>
        </BlockStack>
      </BlockStack>
    </Box>
  );
} 