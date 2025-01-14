import BannerSliderRender from './render';
import BannerSliderConfig from './config';
import BannerSliderPreview from './preview';
import type { UIBlock } from '@/lib/store/types';

interface Props {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
  isActive: boolean;
  block: UIBlock;
}

export default function BannerSlider({ mode, blockId, isActive, block }: Props) {
  switch (mode) {
    case 'render':
      return <BannerSliderRender blockId={blockId} isActive={isActive} />;
    case 'config':
      return <BannerSliderConfig block={block} />;
    case 'preview':
      return <BannerSliderPreview blockId={blockId} block={block} />;
    default:
      return null;
  }
}
