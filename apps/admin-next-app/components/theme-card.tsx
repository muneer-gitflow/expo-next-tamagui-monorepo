import { Text, Badge, Button, Box, InlineStack } from '@shopify/polaris';
import type { AppTheme } from 'app/lib/store/types';
import { resolveImage } from '@/lib/cms';

interface ThemeCardProps {
  theme: AppTheme;
  cmsBaseUrl: string;
}

export function ThemeCard({ theme, cmsBaseUrl }: ThemeCardProps) {
  return (
    <Box borderWidth="050" borderColor="border" padding="400" borderRadius="300" position="relative" minHeight="100%">
      <InlineStack gap="400">
        <Box width="100%">
          <img
            alt={`${theme.title} preview`}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
            src={resolveImage(theme.thumbnail_image.id, cmsBaseUrl || '')}
          />
        </Box>

        <Box>
          <InlineStack gap="200" align="start">
            <Badge>{theme.niche}</Badge>
            <Text fontWeight="bold" variant="bodyMd" as="span">
              {theme.title}
            </Text>
          </InlineStack>
        </Box>

        <Box minHeight="80px">
          <Text variant="bodyMd" as="span">
            {theme.description}
          </Text>
        </Box>

        <Box>
          <InlineStack gap="200" align="space-between">
            <Box>
              {theme.screens[0]?.id && (
                <Button
                  url={`/app/theme/${theme.id}?screen=${btoa(`${theme.screens[0].name}-${theme.screens[0].id}`)}`}
                >
                  Customize
                </Button>
              )}
            </Box>
            <Box>
              <Button variant="primary" url={`/app/theme/${theme.id}/publish`}>
                Publish
              </Button>
            </Box>
          </InlineStack>
        </Box>
      </InlineStack>
    </Box>
  );
}
