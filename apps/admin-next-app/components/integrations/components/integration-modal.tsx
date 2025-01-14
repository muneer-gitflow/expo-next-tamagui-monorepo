import {
  Modal,
  BlockStack,
  Text,
  InlineStack,
  Icon,
  Banner,
  Button,
  Link,
  List,
  CalloutCard,
  Box,
} from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import type { Integration } from '../context/IntegrationsContext';
import { useIntegrations } from '../context/IntegrationsContext';

interface IntegrationModalProps {
  integration: Integration | null;
  open: boolean;
  onClose: () => void;
  onToggle: (integration: Integration) => void;
}

export function IntegrationModal({ integration, open, onClose, onToggle }: IntegrationModalProps) {
  const { ghlFeatures } = useIntegrations();
  
  if (!integration) return null;

  const renderGHLDetails = () => {
    if (!integration.ghlFeature) return null;

    const details = ghlFeatures[integration.ghlFeature];

    return (
      <BlockStack gap="400">
        <CalloutCard
          title={details.title}
          illustration="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          primaryAction={{
            content: 'Learn More',
            onAction: () => window.open('https://meet.gitspark.com/book-meeting', '_blank'),
          }}
        >
          <BlockStack gap="400">
            <Text as="p">
              Integrate your mobile app with Go High Level's powerful {integration.id.split('_')[1].toUpperCase()}{' '}
              features.
            </Text>
          </BlockStack>
        </CalloutCard>

        <BlockStack gap="400">
          <Text variant="headingSm">Key Features</Text>
          <List type="bullet">
            {details.features.map((feature, index) => (
              <List.Item key={index}>{feature}</List.Item>
            ))}
          </List>
        </BlockStack>

        <BlockStack gap="400">
          <Text variant="headingSm">How It Works</Text>
          <List type="number">
            {details.workflow.map((step, index) => (
              <List.Item key={index}>
                <InlineStack gap="200" align="center">
                  <Text as="span">{step}</Text>
                  {index < details.workflow.length - 1 && <Icon source={ArrowRightIcon} />}
                </InlineStack>
              </List.Item>
            ))}
          </List>
        </BlockStack>

        <BlockStack gap="400">
          <Text variant="headingSm">Benefits</Text>
          <List type="bullet">
            {details.benefits.map((benefit, index) => (
              <List.Item key={index}>{benefit}</List.Item>
            ))}
          </List>
        </BlockStack>

        <Banner tone="info">
          <BlockStack gap="200">
            <Text variant="headingSm">Ready to Supercharge Your Mobile App?</Text>
            <Text as="p">
              Connect with our integration specialists to set up your GHL integration and unlock powerful automation
              capabilities.
            </Text>
            <Button onClick={() => window.open('https://meet.gitspark.com/book-meeting', '_blank')} tone="success">
              Schedule Integration Consultation
            </Button>
          </BlockStack>
        </Banner>

        <Box background="bg-surface-secondary" padding="400" borderRadius="200">
          <BlockStack gap="400">
            <Text variant="headingMd">Developer Implementation Guide</Text>
            
            <BlockStack gap="300">
              <Text variant="headingSm">Requirements</Text>
              <List type="bullet">
                {details.developerNotes.requirements.map((req, index) => (
                  <List.Item key={index}>{req}</List.Item>
                ))}
              </List>
            </BlockStack>

            <BlockStack gap="300">
              <Text variant="headingSm">Implementation Steps</Text>
              <List type="number">
                {details.developerNotes.implementation.map((step, index) => (
                  <List.Item key={index}>{step}</List.Item>
                ))}
              </List>
            </BlockStack>

            <BlockStack gap="300">
              <Text variant="headingSm">Code Examples</Text>
              {Object.entries(details.developerNotes.codeSnippets).map(([key, snippet]) => (
                <Box key={key} background="bg-surface" padding="300" borderRadius="100">
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                    <code>{snippet}</code>
                  </pre>
                </Box>
              ))}
            </BlockStack>

            <BlockStack gap="300">
              <Text variant="headingSm">API Endpoints</Text>
              <List type="bullet">
                {details.developerNotes.apiEndpoints.map((endpoint, index) => (
                  <List.Item key={index}>
                    <Text as="span" variant="bodySm">
                      <strong>{endpoint.method}</strong> {endpoint.endpoint} - {endpoint.description}
                    </Text>
                  </List.Item>
                ))}
              </List>
            </BlockStack>
          </BlockStack>
        </Box>
      </BlockStack>
    );
  };

  const renderRegularDetails = () => {
    if (integration.id.startsWith('ghl_')) return null;

    return (
      <BlockStack gap="400">
        {integration.requiresSetup && (
          <Banner tone="warning">
            <BlockStack gap="200">
              <Text variant="headingSm">Setup Required</Text>
              <Text as="p">This integration requires additional configuration before it can be used.</Text>
            </BlockStack>
          </Banner>
        )}

        {/* Documentation Links */}
        {(integration.documentation || integration.setupGuide) && (
          <BlockStack gap="200">
            <Text variant="headingSm">Documentation</Text>
            <List>
              {integration.documentation && (
                <List.Item>
                  <Link url={integration.documentation} external>
                    View Documentation
                  </Link>
                </List.Item>
              )}
              {integration.setupGuide && (
                <List.Item>
                  <Link url={integration.setupGuide} external>
                    Setup Guide
                  </Link>
                </List.Item>
              )}
            </List>
          </BlockStack>
        )}

        {/* Premium Features */}
        {integration.premium && (
          <Banner tone="info">
            <BlockStack gap="200">
              <Text variant="headingSm">Premium Integration</Text>
              <Text as="p">
                This is a premium integration. Contact us to learn more about pricing and implementation.
              </Text>
              <Button onClick={() => window.open('https://meet.gitspark.com/book-meeting', '_blank')} tone="success">
                Schedule a Consultation
              </Button>
            </BlockStack>
          </Banner>
        )}

        {/* Shopify Plus Requirements */}
        {integration.requiresPlus && (
          <Banner tone="info">
            <BlockStack gap="200">
              <Text variant="headingSm">Shopify Plus Required</Text>
              <Text as="p">
                This integration requires a Shopify Plus subscription to access custom checkout features. Contact our team to
                learn more about upgrading to Shopify Plus and implementing custom checkout solutions.
              </Text>
              <Button onClick={() => window.open('https://meet.gitspark.com/book-meeting', '_blank')} tone="success">
                Schedule a Consultation
              </Button>
            </BlockStack>
          </Banner>
        )}
      </BlockStack>
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={integration.name}
      primaryAction={{
        content: integration.enabled ? 'Disconnect' : 'Connect',
        onAction: () => {
          onToggle(integration);
          if (!integration.requiresSetup) {
            onClose();
          }
        },
        tone: integration.enabled ? undefined : 'success',
      }}
      secondaryActions={[
        {
          content: 'Close',
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="400">
          {/* Integration Logo and Description */}
          <InlineStack gap="400" align="start">
            <Box padding="200" background="bg-surface-secondary" borderRadius="200">
              <integration.icon />
            </Box>
            <Text as="p" variant="bodyMd">
              {integration.description}
            </Text>
          </InlineStack>

          {/* GHL Specific Details */}
          {renderGHLDetails()}

          {/* Regular Integration Details */}
          {renderRegularDetails()}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
