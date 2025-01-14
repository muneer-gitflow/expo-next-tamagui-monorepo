import ProductDetailsRender from './render';
import ProductDetailsConfig from './config';
import ProductDetailsPreview from './preview';

export default function ProductDetails({ mode, blockId }: { mode: 'render' | 'config' | 'preview'; blockId: string }) {
  switch (mode) {
    case 'render':
      return <ProductDetailsRender blockId={blockId} />;
    case 'config':
      return <ProductDetailsConfig blockId={blockId} />;
    case 'preview':
      return <ProductDetailsPreview blockId={blockId} />;
  }
}
