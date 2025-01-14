import {
  Box,
  InlineStack,
  InlineGrid,
  SkeletonDisplayText,
  SkeletonBodyText,
  SkeletonThumbnail,
} from '@shopify/polaris';

export default function ActiveThemeCardSkeleton() {
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
            <SkeletonThumbnail size="large" />
          </Box>
        </InlineGrid>
        <InlineGrid>
          <Box paddingBlockEnd="200">
            <SkeletonDisplayText size="large" />
          </Box>
          <Box paddingBlockStart="300" paddingBlockEnd="300">
            <InlineGrid alignItems="center" gap="100">
              <SkeletonBodyText lines={2} />
            </InlineGrid>
          </Box>
          <InlineStack>
            <InlineGrid alignItems="center" gap="400" columns={2}>
              <Box width="120px">
                <SkeletonDisplayText size="small" />
              </Box>
              <Box width="120px">
                <SkeletonDisplayText size="small" />
              </Box>
            </InlineGrid>
          </InlineStack>
        </InlineGrid>
      </InlineStack>
    </Box>
  );
}
