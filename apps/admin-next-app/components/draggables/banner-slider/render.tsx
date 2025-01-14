import { useSelector } from 'react-redux';
import type { RootState } from 'app/lib/store/store';
import { useState } from 'react';
import { InlineGrid } from '@shopify/polaris';
import PlaceholderImage from '@/components/ui/place-holder-image';

interface Banner {
  id: string;
  image?: string;
  title?: string;
  navigateTo: string | null;
  navigationType: 'product' | 'collection' | 'page' | 'url' | null;
}

export default function BannerSliderRender({ blockId, isActive }: { blockId: string; isActive: boolean }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dndBlocks = useSelector((state: RootState) => state?.dnd?.droppedComponents);
  const configToRender = dndBlocks?.find((c) => c.block_id === blockId)?.config as Banner[];

  return (
    <InlineGrid gap="200">
      <div
        style={{
          height: '141px',
          display: 'flex',
          gap: '12px',
          position: 'relative',
          width: '100%',
        }}
      >
        {configToRender?.map((banner, index) => (
          <div
            key={banner?.id}
            style={{
              width: '100%',
              position: 'absolute',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              background: '#f1f1f1',
              borderRadius: '10px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {banner?.image ? (
              <img
                src={banner.image}
                alt={banner.title || `Slide ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <PlaceholderImage text={`Banner ${index + 1}`} width="100%" height="140px" />
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '4px',
          justifyContent: 'center',
          paddingBlock: '10px',
        }}
      >
        {(configToRender || Array.from({ length: 4 })).map((_, index) => (
          <span
            key={index as unknown as string}
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              display: 'flex',
              backgroundColor: index === currentSlide ? '#fff' : '#424242',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => setCurrentSlide(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setCurrentSlide(index);
              }
            }}
          />
        ))}
      </div>
    </InlineGrid>
  );
}
