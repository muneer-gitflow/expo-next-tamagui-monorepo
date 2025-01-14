import ProductSelector from './product-selector';
import CollectionSelector from './collection-selector';
import PageSelector from './page-selector';
import UrlSelector from './url-selector';

interface NavigationTargetSelectorProps {
  collectionTarget: string | null;
  productTarget: string | null;
  urlTarget: string | null;
  pageTarget: string | null;
  selectedNavigationType: 'product' | 'collection' | 'page' | 'url';
  onSelect: ({
    navigationType,
    value,
    label,
  }: {
    navigationType: 'product' | 'collection' | 'page' | 'url';
    value: string;
    label: string;
  }) => void;
}

export default function NavigationTargetSelector({
  selectedNavigationType,
  collectionTarget,
  productTarget,
  urlTarget,
  pageTarget,
  onSelect,
}: NavigationTargetSelectorProps) {
  switch (selectedNavigationType) {
    case 'product':
      return <ProductSelector selectedProduct={''} productTarget={productTarget} onSelect={onSelect} />;

    case 'collection':
      return <CollectionSelector selectedCollection={''} collectionTarget={collectionTarget} onSelect={onSelect} />;

    case 'page':
      return <PageSelector pageTarget={pageTarget} onSelect={onSelect} />;

    case 'url':
      return <UrlSelector urlTarget={urlTarget} onSelect={onSelect} />;
    default:
      return null;
  }
}
