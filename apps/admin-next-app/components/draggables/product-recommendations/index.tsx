import ProductRecommendationsRender from './render';
import ProductRecommendationsConfig from './config';
import ProductRecommendationsPreview from './preview';

export default function ProductRecommendations({
  mode,
  blockId,
}: {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
}) {
  switch (mode) {
    case 'render':
      return <ProductRecommendationsRender blockId={blockId} />;
    case 'config':
      return <ProductRecommendationsConfig blockId={blockId} />;
    case 'preview':
      return <ProductRecommendationsPreview blockId={blockId} />;
  }
}
