import { Modal, BlockStack } from '@shopify/polaris';
import type { Feature } from '../context/FeaturesContext';
import { GoogleAuthForm } from '../credential-forms/google-auth-form';
import { PushNotificationForm } from '../credential-forms/push-notification-form';

interface FeatureModalProps {
  feature: Feature | null;
  open: boolean;
  onClose: () => void;
}

export function FeatureModal({ feature, open, onClose }: FeatureModalProps) {
  if (!feature) return null;

  const getForm = () => {
    switch (feature.id) {
      case 'google_auth':
        return <GoogleAuthForm onComplete={onClose} />;
      case 'push_notifications':
        return <PushNotificationForm onComplete={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Configure ${feature.name}`}
      primaryAction={{
        content: 'Close',
        onAction: onClose,
      }}
    >
      <Modal.Section>
        <BlockStack gap="400">{getForm()}</BlockStack>
      </Modal.Section>
    </Modal>
  );
}
