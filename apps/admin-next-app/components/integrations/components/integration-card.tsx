import { Box, Card, Text, InlineStack, BlockStack, Button, Icon, Tag } from '@shopify/polaris';
import { CheckCircleIcon, AlertTriangleIcon, ClockIcon } from '@shopify/polaris-icons';
import type { Integration } from '../context/IntegrationsContext';

interface IntegrationCardProps {
  integration: Integration;
  onToggle: (integration: Integration) => void;
  onSelect: () => void;
}

export function IntegrationCard({ integration, onToggle, onSelect }: IntegrationCardProps) {
  const getStatusDetails = () => {
    if (!integration.enabled) {
      return { icon: ClockIcon, tone: 'subdued' as const, label: 'Not Connected' };
    }

    switch (integration.status) {
      case 'active':
        return { icon: CheckCircleIcon, tone: 'success' as const, label: 'Connected' };
      case 'pending':
        return { icon: ClockIcon, tone: 'warning' as const, label: 'Setup Required' };
      case 'error':
        return { icon: AlertTriangleIcon, tone: 'critical' as const, label: 'Connection Error' };
      default:
        return { icon: ClockIcon, tone: 'info' as const, label: 'Available' };
    }
  };

  const status = getStatusDetails();

  return (
    <div onClick={onSelect} style={{ cursor: 'pointer' }}>
      <Card padding="400">
        <BlockStack gap="400">
          {/* Logo and Title */}
          <InlineStack gap="400" align="start">
            <Box background="bg-surface-secondary" borderRadius="200" padding="300" minWidth="50px" minHeight="50px">
              <integration.icon />
            </Box>
            <BlockStack gap="100">
              <Text as="h3" variant="headingSm">
                {integration.name}
              </Text>
              <InlineStack gap="200" wrap>
                {integration.popular && <Tag>Popular</Tag>}
                {integration.premium && <Tag tone="success">Premium</Tag>}
                {integration.requiresPlus && <Tag tone="info">Shopify Plus</Tag>}
                {integration.partnerStatus === 'official' && <Tag tone="info">Official</Tag>}
              </InlineStack>
            </BlockStack>
          </InlineStack>

          {/* Description */}
          <Text as="p" variant="bodySm" tone="subdued">
            {integration.description}
          </Text>

          {/* Status and Action */}
          <Box paddingBlockStart="200">
            <InlineStack gap="400" align="space-between">
              <InlineStack gap="200" align="center">
                <Icon source={status.icon} tone={status.tone} />
                <Text as="span" variant="bodySm" tone={status.tone}>
                  {status.label}
                </Text>
              </InlineStack>
              <Box onClick={(e) => e.stopPropagation()}>
                <Button
                  onClick={() => onToggle(integration)}
                  variant={integration.enabled ? 'primary' : 'secondary'}
                  tone={integration.enabled ? 'success' : undefined}
                  size="slim"
                >
                  {integration.enabled ? 'Connected' : 'Connect'}
                </Button>
              </Box>
            </InlineStack>
          </Box>
        </BlockStack>
      </Card>
    </div>
  );
}
