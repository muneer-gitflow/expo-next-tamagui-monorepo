import ProductsGridNewRender from './render';
import ProductsGridNewConfig from './config';
import ProductsGridNewPreview from './preview';
import type { UIBlock } from '@/lib/store/types';
interface Props {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
  isActive: boolean;
  block: UIBlock;
}

export default function ProductsGridNew({ mode, blockId, isActive, block }: Props) {
  switch (mode) {
    case 'render':
      return <ProductsGridNewRender blockId={blockId} isActive={isActive} />;
    case 'config':
      return <ProductsGridNewConfig blockId={blockId} />;
    case 'preview':
      return <ProductsGridNewPreview blockId={blockId} block={block} />;
    default:
      return null;
  }
}
