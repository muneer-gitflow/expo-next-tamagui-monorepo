import {
  Box,
  Card,
  Text,
  Banner,
  InlineStack,
  BlockStack,
  Button,
  Icon,
  TextField,
  Tabs,
  Grid,
  Pagination,
  Page,
} from '@shopify/polaris';
import { SearchIcon, PlusIcon } from '@shopify/polaris-icons';
import { useState, useMemo, useEffect } from 'react';
import { useIntegrations } from './context/IntegrationsContext';
import { IntegrationCard } from './components/integration-card';
import { PromoSlider } from '@/components/features-flags/components/promo-slider';
import { IntegrationModal } from './components/integration-modal';
import type { Integration } from './context/IntegrationsContext';

const INTEGRATION_TYPES = [
  { id: 'all', label: 'All Integrations' },
  { id: 'payment', label: 'Payment' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'crm', label: 'CRM' },
  { id: 'erp', label: 'ERP' },
  { id: 'marketplace', label: 'Marketplace' },
];

export function Integrations() {
  const { state, dispatch } = useIntegrations();
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredIntegrations = useMemo(() => {
    return state.integrations.filter((integration) => {
      const matchesSearch =
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'all' || integration.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [state.integrations, searchQuery, selectedType]);

  // Calculate pagination
  const totalItems = filteredIntegrations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedIntegrations = filteredIntegrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType]);

  const handleToggleIntegration = (integration: Integration) => {
    dispatch({
      type: 'TOGGLE_INTEGRATION',
      payload: { id: integration.id },
    });

    if (integration.requiresSetup && !integration.configured) {
      setSelectedIntegration(integration);
    }
  };

  return (
    <Page
      title="Integrations"
      primaryAction={<Button variant="primary">Add Custom Integration</Button>}
      secondaryActions={[
        {
          content: 'Manage segments',
        },
      ]}
    >
      <BlockStack gap="600">
        <Box padding="400" background="bg-surface-secondary">
          <BlockStack gap="400">
            <InlineStack align="space-between">
              <Text as="h2" variant="headingMd">
                Integrations
              </Text>
              <Button icon={PlusIcon}>Add Custom Integration</Button>
            </InlineStack>

            <InlineStack gap="400" align="start">
              <Box minWidth="320px">
                <TextField
                  label="Search integrations"
                  prefix={<Icon source={SearchIcon} />}
                  placeholder="Search integrations"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  clearButton
                  onClearButtonClick={() => setSearchQuery('')}
                />
              </Box>
              <Box flex="1">
                <Tabs
                  tabs={INTEGRATION_TYPES.map((type) => ({
                    id: type.id,
                    content: type.label,
                    panelID: `${type.id}-panel`,
                    selected: selectedType === type.id,
                  }))}
                  selected={INTEGRATION_TYPES.findIndex((type) => type.id === selectedType)}
                  onSelect={(idx) => setSelectedType(INTEGRATION_TYPES[idx].id)}
                  fitted
                />
              </Box>
            </InlineStack>
          </BlockStack>
        </Box>

        <PromoSlider />

        <Box padding="400">
          <BlockStack gap="400">
            {filteredIntegrations.length === 0 ? (
              <Banner tone="info">
                <Text as="p">No integrations found matching your criteria.</Text>
              </Banner>
            ) : (
              <BlockStack gap="400">
                <Grid>
                  {paginatedIntegrations.map((integration) => (
                    <Grid.Cell key={integration.id} columnSpan={{ xs: 12, sm: 6, md: 4 }}>
                      <IntegrationCard
                        integration={integration}
                        onToggle={handleToggleIntegration}
                        onSelect={() => setSelectedIntegration(integration)}
                      />
                    </Grid.Cell>
                  ))}
                </Grid>

                {totalPages > 1 && (
                  <Box padding="400">
                    <InlineStack align="center" justify="center">
                      <Pagination
                        label={`${currentPage} of ${totalPages}`}
                        hasPrevious={currentPage > 1}
                        onPrevious={() => handlePageChange(currentPage - 1)}
                        hasNext={currentPage < totalPages}
                        onNext={() => handlePageChange(currentPage + 1)}
                      />
                    </InlineStack>
                    <Box paddingBlockStart="300">
                      <Text as="p" alignment="center" tone="subdued">
                        Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
                        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} integrations
                      </Text>
                    </Box>
                  </Box>
                )}
              </BlockStack>
            )}
          </BlockStack>
        </Box>

        <IntegrationModal
          integration={selectedIntegration}
          open={selectedIntegration !== null}
          onClose={() => setSelectedIntegration(null)}
          onToggle={handleToggleIntegration}
        />
      </BlockStack>
    </Page>
  );
}
