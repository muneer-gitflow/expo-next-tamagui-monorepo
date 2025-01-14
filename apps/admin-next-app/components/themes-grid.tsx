import { Text, Box, Grid, InlineStack, InlineGrid } from '@shopify/polaris';
import { ThemeCard } from './theme-card';
import { ThemeCardSkeleton } from './theme-card-skeleton';
import type { AppTheme } from '@/lib/store/types';

const LoadingState = () => {
  return (
    <Grid>
      {[1, 2, 3].map((key) => (
        <Grid.Cell key={key} columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
          <ThemeCardSkeleton />
        </Grid.Cell>
      ))}
    </Grid>
  );
};

export default function ThemesGrid({
  isLoading,
  themes,
  cmsBaseUrl,
}: {
  isLoading: boolean;
  themes: AppTheme[];
  cmsBaseUrl: string;
}) {
  return (
    <Box
      background="bg-fill"
      shadow="100"
      borderWidth="025"
      borderColor="border"
      padding="400"
      borderRadius="500"
      position="relative"
    >
      <InlineStack gap="400">
        <Box paddingBlockEnd="400">
          <InlineGrid gap="200">
            <Text variant="headingLg" as="h1">
              App design
            </Text>
            <Text variant="bodySm" tone="subdued" as="span">
              Customize layouts, colors, and navigation to create a seamless shopping experience.
            </Text>
          </InlineGrid>
        </Box>

        {isLoading ? (
          <LoadingState />
        ) : (
          <Grid>
            {themes?.map((theme) => (
              <Grid.Cell key={theme.id} columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                <ThemeCard theme={theme} cmsBaseUrl={cmsBaseUrl} />
              </Grid.Cell>
            ))}
          </Grid>
        )}
      </InlineStack>
    </Box>
  );
}
