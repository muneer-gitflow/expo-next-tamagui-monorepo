import ProductsGridPaginatedRender from './render';
import ProductsGridPaginatedConfig from './config';
import ProductsGridPaginatedPreview from './preview';

export default function ProductsGridPaginated({
  mode,
  blockId,
}: {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
}) {
  switch (mode) {
    case 'render':
      return <ProductsGridPaginatedRender blockId={blockId} />;
    case 'config':
      return <ProductsGridPaginatedConfig />;
    case 'preview':
      return <ProductsGridPaginatedPreview blockId={blockId} />;
  }
}
