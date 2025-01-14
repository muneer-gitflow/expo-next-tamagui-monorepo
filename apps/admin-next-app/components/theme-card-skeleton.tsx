import { Box, InlineStack, SkeletonDisplayText, SkeletonBodyText, SkeletonThumbnail } from '@shopify/polaris';

export function ThemeCardSkeleton() {
  return (
    <Box borderWidth="050" borderColor="border" padding="400" borderRadius="300" position="relative" minHeight="100%">
      <InlineStack gap="400" vertical>
        {/* Image placeholder */}
        <Box width="100%">
          <SkeletonThumbnail size="large" />
        </Box>

        {/* Title and badge section */}
        <Box>
          <InlineStack gap="200">
            <Box width="80px">
              <SkeletonDisplayText size="small" />
            </Box>
            <Box width="120px">
              <SkeletonDisplayText size="small" />
            </Box>
          </InlineStack>
        </Box>

        {/* Description lines */}
        <Box minHeight="80px">
          <SkeletonBodyText lines={2} />
        </Box>

        {/* Buttons section */}
        <Box>
          <InlineStack gap="200" align="space-between">
            <Box width="80px">
              <SkeletonDisplayText size="small" />
            </Box>
            <Box width="80px">
              <SkeletonDisplayText size="small" />
            </Box>
          </InlineStack>
        </Box>
      </InlineStack>
    </Box>
  );
}
