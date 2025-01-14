import { Text, Button, Box, InlineStack, InlineGrid } from '@shopify/polaris';
import { EditIcon, ShopcodesIcon } from '@shopify/polaris-icons';
import { resolveImage } from '@/lib/cms';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';
import ActiveThemeCardSkeleton from './active-theme-card-skeleton';

interface ActiveThemeCardProps {
  isLoading?: boolean;
}

export default function ActiveThemeCard({ isLoading }: ActiveThemeCardProps) {
  const activeTheme = useSelector((state: RootState) => state.theme.activeTheme);
  const cmsBaseUrl = useSelector((state: RootState) => state.appState.config.cmsBaseUrl);

  if (isLoading) {
    return <ActiveThemeCardSkeleton />;
  }

  if (!activeTheme) {
    return <ActiveThemeCardSkeleton />;
  }

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
        <InlineGrid>
          <Box
            background="bg"
            width="200px"
            borderWidth="025"
            borderRadius="400"
            borderColor="border"
            overflowX="hidden"
            overflowY="hidden"
          >
            <img
              alt="App preview"
              height="200"
              width="200"
              style={{ objectFit: 'cover' }}
              src={resolveImage(activeTheme?.thumbnail_image?.id, cmsBaseUrl || '')}
            />
          </Box>
        </InlineGrid>
        <InlineGrid>
          <Text variant="headingLg" as="h1">
            {activeTheme.title}
          </Text>
          <Box paddingBlockStart="300" paddingBlockEnd="300">
            <InlineGrid alignItems="center" gap="100" aria-rowspan={2}>
              <Text variant="bodyXs" as="span">
                Built on {activeTheme.title} theme
              </Text>
              <Text variant="bodyXs" as="span">
                Last saved: Nov 27, 2024 at 10:58 pm
              </Text>
            </InlineGrid>
          </Box>
          <InlineStack>
            <InlineGrid alignItems="center" gap="400" columns={2}>
              <Button icon={EditIcon} variant="primary" url={`/app/theme/${activeTheme.id}`}>
                Continue editing
              </Button>
              <Button icon={ShopcodesIcon} variant="tertiary" onClick={() => {}}>
                Preview on mobile
              </Button>
            </InlineGrid>
          </InlineStack>
        </InlineGrid>
      </InlineStack>
    </Box>
  );
}
