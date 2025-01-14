import { Box, Text, InlineGrid } from '@shopify/polaris';
import type { UIBlock } from '@/lib/store/types';

interface StoreLogoCarouselPreviewProps {
  blockId: string;
  block: UIBlock;
}

export default function StoreLogoCarouselPreview({ blockId, block }: StoreLogoCarouselPreviewProps) {
  return (
    <>
      <Box borderWidth="025" paddingBlock={'300'} borderColor="border" borderRadius="200">
        <InlineGrid gap={'300'}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '12px',
              paddingRight: '12px',
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <InlineGrid gap={'100'} alignItems="center" key={i}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f1f1f1',
                    height: '50px',
                    width: '50px',
                    borderRadius: '100%',
                  }}
                >
                  <img width="18" src="/imagePlaceholder.svg" alt="" />
                </div>
                <Text alignment="center" variant="bodySm" as="span">
                  Text
                </Text>
              </InlineGrid>
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
        </InlineGrid>
      </Box>
    </>
  );
}
