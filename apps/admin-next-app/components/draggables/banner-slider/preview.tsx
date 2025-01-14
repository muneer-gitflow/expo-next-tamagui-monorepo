import { Box, Text, InlineGrid } from '@shopify/polaris';
import type { UIBlock } from '@/lib/store/types';

export default function BannerSliderPreview({ blockId, block }: { blockId: string; block: UIBlock }) {
  return (
    <>
      <InlineGrid gap="200">
        <Box borderWidth="025" paddingBlock={'300'} borderColor="border" borderRadius="200">
          <div
            style={{
              height: '120px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <span
              style={{
                width: '100%',
                background: '#f1f1f1',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/imagePlaceholder.svg"
                alt="Banner Preview"
                style={{
                  width: '48px',
                  height: '44px',
                }}
              />
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '4px',
              justifyContent: 'center',
              paddingBlock: '10px',
            }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={String(i)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: i === 0 ? '#999' : '#F5F4F4',
                }}
              />
            ))}
          </div>
          <Box paddingInline={'300'}>
            <InlineGrid>
              <Text fontWeight="medium" variant="bodyMd" as="span">
                {block.display_name}
              </Text>
              <Text variant="bodySm" tone="subdued" as="span">
                {block.description}
              </Text>
            </InlineGrid>
          </Box>
        </Box>
      </InlineGrid>
    </>
  );
}
