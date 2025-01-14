import { Box, Card, Text, InlineStack, BlockStack, Button, Icon, Tag, Modal, Banner, List } from '@shopify/polaris';
import type { Feature } from '../context/FeaturesContext';
import { FeatureIcon } from './feature-icons';
import { useState } from 'react';

interface FeatureCardProps {
  feature: Feature;
  handleToggleFeature: (feature: Feature) => void;
  getStatusDetails: (feature: Feature) => {
    label: string;
    icon: React.ReactNode;
    tone: 'success' | 'critical' | 'warning' | 'info' | 'subdued';
  };
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export default function FeatureCard({ feature, handleToggleFeature, getStatusDetails }: FeatureCardProps) {
  const status = getStatusDetails(feature);
  const [showDetails, setShowDetails] = useState(false);

  const handleAction = () => {
    if (feature.requiresConsultation || (feature.premium && !feature.enabled)) {
      window.open('https://meet.gitspark.com/book-meeting', '_blank');
    } else {
      handleToggleFeature(feature);
    }
  };

  const getButtonText = () => {
    if (feature.comingSoon) return 'Coming Soon';
    if (feature.requiresConsultation) return 'Book a Consultation';
    if (feature.premium && !feature.enabled) return 'Schedule Demo';
    return feature.enabled ? 'Enabled' : 'Enable';
  };

  const getButtonProps = () => {
    if (feature.comingSoon) {
      return {
        disabled: true,
        variant: 'secondary' as const,
        tone: undefined,
      };
    }

    if (feature.requiresConsultation || (feature.premium && !feature.enabled)) {
      return {
        disabled: false,
        variant: 'primary' as const,
        tone: 'success' as const,
      };
    }

    return {
      disabled: false,
      variant: feature.enabled ? ('primary' as const) : ('secondary' as const),
      tone: feature.enabled ? ('success' as const) : undefined,
    };
  };

  return (
    <>
      <div onClick={() => setShowDetails(true)} style={{ cursor: 'pointer' }}>
        <Card padding="400">
          <BlockStack gap="400">
            {/* Icon Row */}
            <Box>
              <Box
                background={feature.enabled ? 'bg-surface-secondary' : ('bg-subdued' as any)}
                borderRadius="200"
                padding="300"
                width="44px"
                height="44px"
              >
                <Box opacity={!feature.enabled || feature.comingSoon ? '50' : undefined}>
                  <FeatureIcon featureId={feature.id} />
                </Box>
              </Box>
            </Box>

            {/* Title and Description */}
            <BlockStack gap="100">
              <Text as="h3" variant="headingSm" tone={!feature.enabled || feature.comingSoon ? 'subdued' : undefined}>
                {truncateText(feature.name, 40)}
              </Text>
              <Box minHeight="48px">
                {' '}
                {/* Fixed height for 2 lines of text */}
                <Text as="p" variant="bodySm" tone="subdued">
                  {truncateText(feature.description, 80)}
                </Text>
              </Box>
            </BlockStack>

            {/* Status and Tags */}
            <InlineStack gap="200" align="start" wrap>
              <InlineStack gap="200" align="center">
                <Icon source={status.icon as any} tone={status.tone} />
                <Text as="span" variant="bodySm" tone={status.tone}>
                  {status.label}
                </Text>
              </InlineStack>
              {feature.comingSoon && <Tag tone="info">Coming Soon</Tag>}
              {feature.beta && <Tag>Beta</Tag>}
              {feature.premium && <Tag tone="success">Premium</Tag>}
              {feature.requiresConsultation && <Tag tone="info">Custom Integration</Tag>}
            </InlineStack>

            {/* Action Button */}
            <Box onClick={(e) => e.stopPropagation()}>
              <Button onClick={handleAction} fullWidth {...getButtonProps()}>
                {getButtonText()}
              </Button>
            </Box>
          </BlockStack>
        </Card>
      </div>

      <Modal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        title={feature.name}
        primaryAction={
          feature.requiresSetup && !feature.configured
            ? {
                content: 'Configure Feature',
                onAction: handleAction,
                tone: 'success',
              }
            : {
                content: getButtonText(),
                onAction: handleAction,
                ...getButtonProps(),
              }
        }
        secondaryActions={[
          {
            content: 'Close',
            onAction: () => setShowDetails(false),
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="500">
            {/* Feature Overview */}
            <BlockStack gap="200">
              <InlineStack gap="400" align="center">
                <Box
                  background={feature.enabled ? 'bg-surface-secondary' : ('bg-subdued' as any)}
                  borderRadius="200"
                  padding="300"
                  width="44px"
                  height="44px"
                >
                  <FeatureIcon featureId={feature.id} />
                </Box>
                <Text variant="headingMd">{feature.name}</Text>
              </InlineStack>
              <Text as="p" variant="bodyMd">
                {feature.description}
              </Text>
            </BlockStack>

            {/* Status Banner */}
            <Banner tone={status.tone as any}>
              <InlineStack gap="200" align="center">
                <Icon source={status.icon as any} tone={status.tone} />
                <Text tone={status.tone}>
                  {feature.enabled ? 'Feature is enabled' : 'Feature is currently disabled'}
                </Text>
              </InlineStack>
            </Banner>

            {/* Configuration Required Section */}
            {feature.requiresSetup && !feature.configured && (
              <BlockStack gap="400">
                <Box
                  background="bg-surface-secondary"
                  borderRadius="200"
                  padding="400"
                >
                  <BlockStack gap="300">
                    <Text variant="headingSm" as="h3">Configuration Required</Text>
                    <Text as="p">
                      This feature needs to be configured before it can be used. The following setup is required:
                    </Text>
                    <List type="bullet">
                      {feature.credentials && Object.keys(feature.credentials).map((key) => (
                        <List.Item key={key}>
                          {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </List.Item>
                      ))}
                      {feature.requiresConsultation && (
                        <List.Item>Consultation with our integration team</List.Item>
                      )}
                    </List>
                  </BlockStack>
                </Box>
              </BlockStack>
            )}

            {/* Feature Details */}
            <BlockStack gap="400">
              {/* Feature Tags */}
              <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                <BlockStack gap="200">
                  <Text variant="headingSm">Feature Details</Text>
                  <InlineStack gap="200" wrap>
                    {feature.premium && <Tag tone="success">Premium</Tag>}
                    {feature.beta && <Tag tone="info">Beta</Tag>}
                    {feature.comingSoon && <Tag>Coming Soon</Tag>}
                    {feature.requiresConsultation && <Tag tone="info">Custom Integration</Tag>}
                  </InlineStack>
                </BlockStack>
              </Box>

              {/* Premium/Consultation Info */}
              {(feature.premium || feature.requiresConsultation) && (
                <Banner tone="info">
                  <BlockStack gap="200">
                    <Text variant="headingSm">
                      {feature.premium ? 'Premium Feature' : 'Custom Integration Required'}
                    </Text>
                    <Text as="p">
                      {feature.premium
                        ? 'This is a premium feature that requires a subscription.'
                        : 'This feature requires custom integration with your existing systems.'}
                    </Text>
                    <Button
                      onClick={() => window.open('https://meet.gitspark.com/book-meeting', '_blank')}
                      tone="success"
                    >
                      Schedule a Consultation
                    </Button>
                  </BlockStack>
                </Banner>
              )}
            </BlockStack>
          </BlockStack>
        </Modal.Section>
      </Modal>
    </>
  );
}
