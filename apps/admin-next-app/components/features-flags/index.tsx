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
  Tag,
  Grid,
  Pagination,
} from '@shopify/polaris';
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  PlusIcon,
  SearchIcon,
  ClockIcon,
  AlertDiamondIcon,
  CreditCardCancelIcon,
} from '@shopify/polaris-icons';
import { FeatureModal } from './components/feature-modal';
import { PromoSlider } from './components/promo-slider';
import { useFeatures } from './context/FeaturesContext';
import type { Feature } from './context/FeaturesContext';
import { useState, useMemo, useEffect } from 'react';
import FeatureCard from './components/feature-card';

const CATEGORIES = [
  { id: 'all', label: 'All Features' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'shopping', label: 'Shopping Experience' },
  { id: 'store', label: 'Store Features' },
  { id: 'support', label: 'Customer Support' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'engagement', label: 'User Engagement' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'localization', label: 'Localization' },
  { id: 'payments', label: 'Payments' },
  { id: 'custom_integration', label: 'Custom Integrations' },
];

const getStatusDetails = (feature: Feature) => {
  if (!feature.enabled) return { icon: CreditCardCancelIcon, tone: 'subdued', label: 'Disabled' };

  switch (feature.status) {
    case 'active':
      return { icon: CheckCircleIcon, tone: 'success', label: 'Active' };
    case 'pending':
      return { icon: ClockIcon, tone: 'warning', label: 'Needs Setup' };
    case 'error':
      return { icon: AlertTriangleIcon, tone: 'critical', label: 'Attention Required' };
    default:
      return { icon: AlertDiamondIcon, tone: 'info', label: 'Available' };
  }
};

export function FeatureFlags() {
  const { state, dispatch } = useFeatures();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Show 9 cards per page (3x3 grid)

  const filteredFeatures = useMemo(() => {
    return state.features.filter((feature) => {
      const matchesSearch =
        feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [state.features, searchQuery, selectedCategory]);

  // Calculate pagination
  const totalItems = filteredFeatures.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedFeatures = filteredFeatures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleToggleFeature = (feature: Feature) => {
    dispatch({
      type: 'TOGGLE_FEATURE',
      payload: { id: feature.id },
    });

    if (feature.requiresSetup && !feature.configured) {
      setSelectedFeature(feature);
    }
  };

  return (
    <BlockStack gap="600">
      <Box padding="400" background="bg-surface-secondary">
        <BlockStack gap="400">
          <InlineStack align="space-between">
            <Text as="h2" variant="headingMd">
              Feature Management
            </Text>
            <Button icon={PlusIcon}>Add Custom Feature</Button>
          </InlineStack>

          <InlineStack gap="400" align="start">
            <Box minWidth="320px">
              <TextField
                prefix={<Icon source={SearchIcon} />}
                placeholder="Search features"
                value={searchQuery}
                onChange={setSearchQuery}
                clearButton
                onClearButtonClick={() => setSearchQuery('')}
              />
            </Box>
            <Box flex="1">
              <Tabs
                tabs={CATEGORIES.map((cat) => ({
                  id: cat.id,
                  content: cat.label,
                  panelID: `${cat.id}-panel`,
                  selected: selectedCategory === cat.id,
                }))}
                selected={CATEGORIES.findIndex((cat) => cat.id === selectedCategory)}
                onSelect={(idx) => setSelectedCategory(CATEGORIES[idx].id)}
                fitted
              />
            </Box>
          </InlineStack>
        </BlockStack>
      </Box>

      <PromoSlider />

      <Box padding="400">
        <BlockStack gap="400">
          {filteredFeatures.length === 0 ? (
            <Banner tone="info">
              <Text as="p">No features found matching your criteria.</Text>
            </Banner>
          ) : (
            <BlockStack gap="400">
              <Grid>
                {paginatedFeatures.map((feature) => (
                  <Grid.Cell key={feature.id} columnSpan={{ xs: 12, sm: 6, md: 4 }}>
                    <FeatureCard
                      feature={feature}
                      handleToggleFeature={handleToggleFeature}
                      getStatusDetails={getStatusDetails}
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
                      Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} features
                    </Text>
                  </Box>
                </Box>
              )}
            </BlockStack>
          )}
        </BlockStack>
      </Box>

      <FeatureModal
        feature={selectedFeature}
        open={selectedFeature !== null}
        onClose={() => setSelectedFeature(null)}
      />
    </BlockStack>
  );
}
