import StoreLogoCarouselRender from './render';
import StoreLogoCarouselConfig from './config';
import StoreLogoCarouselPreview from './preview';
import type { UIBlock } from '@/lib/store/types';
export default function StoreLogoCarousel({
  mode,
  blockId,
  isActive,
  block,
}: {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
  isActive: boolean;
  block: UIBlock;
}) {
  switch (mode) {
    case 'render':
      return <StoreLogoCarouselRender blockId={blockId} isActive={isActive} />;
    case 'config':
      return <StoreLogoCarouselConfig block={block} />;
    case 'preview':
      return <StoreLogoCarouselPreview blockId={blockId} block={block} />;
  }
}
