import ProductsGridBestRender from './render';
import ProductsGridBestConfig from './config';
import ProductsGridBestPreview from './preview';

interface Props {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
  isActive: boolean;
}

export default function ProductsGridBest({ mode, blockId, isActive }: Props) {
  switch (mode) {
    case 'render':
      return <ProductsGridBestRender blockId={blockId} isActive={isActive} />;
    case 'config':
      return <ProductsGridBestConfig blockId={blockId} />;
    case 'preview':
      return <ProductsGridBestPreview blockId={blockId} />;
    default:
      return null;
  }
}
