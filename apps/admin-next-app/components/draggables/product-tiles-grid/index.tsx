import ProductTilesGridRender from './render';
import ProductTilesGridConfig from './config';
import ProductTilesGridPreview from './preview';

export default function ProductTilesGrid({
  mode,
  blockId,
}: {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
}) {
  switch (mode) {
    case 'render':
      return <ProductTilesGridRender blockId={blockId} />;
    case 'config':
      return <ProductTilesGridConfig blockId={blockId} />;
    case 'preview':
      return <ProductTilesGridPreview blockId={blockId} />;
  }
}
