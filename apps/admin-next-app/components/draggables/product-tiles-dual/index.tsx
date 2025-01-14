import ProductTilesDualRender from './render';
import ProductTilesDualConfig from './config';
import ProductTilesDualPreview from './preview';

export default function ProductTilesDual({
  mode,
  blockId,
}: {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
}) {
  switch (mode) {
    case 'render':
      return <ProductTilesDualRender blockId={blockId} />;
    case 'config':
      return <ProductTilesDualConfig blockId={blockId} />;
    case 'preview':
      return <ProductTilesDualPreview blockId={blockId} />;
  }
}
