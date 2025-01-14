import { Box, Card, Text, Banner, InlineStack, Icon, Button } from '@shopify/polaris';
import { CheckCircleIcon, AlertTriangleIcon } from '@shopify/polaris-icons';
import { usePublish } from '../context/PublishContext';

type StoreAccessStatus = 'not_started' | 'pending_invite' | 'invite_sent' | 'invited' | 'accepted' | 'error';

interface StoreStatus {
  ios: {
    status: StoreAccessStatus;
    message: string;
    lastUpdated?: string;
  };
  android: {
    status: StoreAccessStatus;
    message: string;
    lastUpdated?: string;
  };
}

export function StoreAccess() {
  const { state, dispatch } = usePublish();
  const { wizard } = state;

  // This would come from your API/backend
  const storeStatus: StoreStatus = {
    ios: {
      status: 'not_started',
      message: 'Waiting for invitation',
      lastUpdated: '2024-03-20 14:30',
    },
    android: {
      status: 'accepted',
      message: 'Access granted with administrator permissions',
      lastUpdated: '2024-03-19 09:15',
    },
  };

  const handleConfirmInvite = (platform: 'ios' | 'android') => {
    // Here you would update the status in your backend
    dispatch({
      type: 'UPDATE_STORE_ACCESS',
      payload: {
        platform,
        status: 'invite_sent',
      },
    });
  };

  const getStatusIcon = (status: StoreAccessStatus) => {
    switch (status) {
      case 'accepted':
        return <Icon source={CheckCircleIcon} tone="success" />;
      case 'error':
        return <Icon source={AlertTriangleIcon} tone="critical" />;
      default:
        return null;
    }
  };

  const getStatusContent = (platform: 'ios' | 'android') => {
    const status = storeStatus[platform];
    
    switch (status.status) {
      case 'not_started':
        return (
          <>
            <Banner tone="info">
              Please invite admin@gitspark.com as an administrator to continue
            </Banner>
            <Box paddingBlockStart="300">
              <Button
                onClick={() => handleConfirmInvite(platform)}
                tone="success"
              >
                I've Sent the Invitation
              </Button>
            </Box>
          </>
        );
      case 'invite_sent':
        return (
          <Banner tone="warning">
            Thanks for confirming! We'll verify and accept the invitation shortly
          </Banner>
        );
      case 'invited':
        return (
          <Banner tone="info">
            We've received your invitation and will accept it shortly
          </Banner>
        );
      case 'accepted':
        return (
          <Banner tone="success">
            Access granted successfully. We can now publish your app
          </Banner>
        );
      case 'error':
        return (
          <Banner tone="critical">
            There was an issue with the access. Please check the permissions
          </Banner>
        );
    }
  };

  const getPlatformTitle = (platform: 'ios' | 'android') => {
    return platform === 'ios' ? 'App Store Connect' : 'Google Play Console';
  };

  const renderPlatformCard = (platform: 'ios' | 'android') => (
    <Box paddingBlockStart="400">
      <Card>
        <Box padding="400">
          <InlineStack align="space-between">
            <Text as="h3" variant="headingSm">
              {getPlatformTitle(platform)}
            </Text>
            {getStatusIcon(storeStatus[platform].status)}
          </InlineStack>
          <Box paddingBlockStart="400">
            {getStatusContent(platform)}
            <Box paddingBlockStart="200">
              <Text as="p" variant="bodySm" tone="subdued">
                Last updated: {storeStatus[platform].lastUpdated}
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );

  return (
    <Box padding="400">
      <Text as="h2" variant="headingMd">
        Developer Account Access
      </Text>

      {(wizard.storeType === 'both' || wizard.storeType === 'ios-only') && 
        renderPlatformCard('ios')
      }

      {(wizard.storeType === 'both' || wizard.storeType === 'android-only') && 
        renderPlatformCard('android')
      }

      <Box paddingBlockStart="400">
        <Banner tone="info">
          <Text as="p">
            Once we have access to your developer accounts, we'll handle the technical aspects of publishing your app.
            You'll maintain full ownership and control of your app listings.
          </Text>
        </Banner>
      </Box>
    </Box>
  );
}
