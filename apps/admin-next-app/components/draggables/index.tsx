import { type UIBlock, ValidComponentKeys, type ClientWindow } from '@/lib/store/types';
import BannerSlider from './banner-slider';
import CategoryLabels from './category-labels';
import ProductsGridNew from './products-grid-new';

// import ProductsGridBest from './products-grid-best';
// import StoreLogoCarousel from './store-logo-carousal';
// import ProductTilesGrid from './product-tiles-grid';
// import ProductTilesDual from './product-tiles-dual';
// import Searchbar from './searchbar';
// import AnnouncementBar from './announcement-bar';
// import Blogs from './blogs';
// import ProductDetailsPageCard from './product-details-page-card';
// import ProductRecommendations from './product-recommendations';
// import ProductsGridPaginated from './products-grid-paginated';
import CollectionList from './collection-list';
import StoreLogoCarousel from './store-logo-carousal';
import ProductDetailsBasic from './product-details-basic';
// check all keys in the componentMap

export default function DraggableComponent({
  id,
  mode,
  isActive,
  block,
}: {
  id: string;
  mode: 'render' | 'config' | 'preview';
  isActive: boolean;
  block: UIBlock;
}) {
  // Map WebComponents `id` to actual components
  const componentMap: Record<ValidComponentKeys, JSX.Element> = {
    [ValidComponentKeys.BannerSlider]: <BannerSlider block={block} mode={mode} blockId={id} isActive={isActive} />,
    [ValidComponentKeys.Category_Labels]: <CategoryLabels block={block} mode={mode} blockId={id} isActive={isActive} />,
    [ValidComponentKeys.Collection_List]: <CollectionList block={block} mode={mode} blockId={id} isActive={isActive} />,
    [ValidComponentKeys.Product_Grid_New]: (
      <ProductsGridNew block={block} mode={mode} blockId={id} isActive={isActive} />
    ),
    [ValidComponentKeys.Brands_List]: <StoreLogoCarousel block={block} mode={mode} blockId={id} isActive={isActive} />,
    [ValidComponentKeys.Product_Details_Basic]: (
      <ProductDetailsBasic block={block} mode={mode} blockId={id} isActive={isActive} />
    ),
  };

  if (typeof window !== 'undefined') {
    // console.log('ENVIRONMENT', (window as unknown as ClientWindow)?.ENV);
  }

  const isValidComponent = Object.keys(componentMap).includes(id);

  if (
    !isValidComponent &&
    typeof window !== 'undefined' &&
    (window as unknown as ClientWindow)?.ENV?.PUBLIC_ENV_ENVIRONMENT === 'development'
  ) {
    return <div>Invalid component : Key {id} not found</div>;
  }

  return (
    <>
      {/* {mode === 'config' ?  : null} */}
      {componentMap[id as ValidComponentKeys]}
    </>
  );
}
