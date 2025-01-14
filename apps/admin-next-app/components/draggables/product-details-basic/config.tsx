import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageResizing from '@/components/utils-components/image-resizing';
import { Box, Card } from '@shopify/polaris';
import ImageRatioSelector from '@/components/utils-components/image-ratio-selector';
import { ToggleWithIcon } from '@/components/ui/toggle-with-icon';
import { ActionGroup } from '@/components/ui/action-group';
import ProductSelector from '@/components/utils-components/product-selector';
import type { UIBlock } from '@/lib/store/types';

const schema = z.object({
  image: z.string().optional(),
  resize: z.enum(['fill', 'fit', 'stretch']).optional(),
  showWishlistIcon: z.boolean().default(false),
  showAddToCart: z.boolean().default(true),
  showBuyNow: z.boolean().default(false),
  showQuantitySelector: z.boolean().default(true),
  addToCartText: z.string().default('Add to cart'),
  buyNowText: z.string().default('Buy now'),
  product: z.string().optional(),
});

export default function ProductDetailsBasicConfig({ block }: { block: UIBlock }) {
  const { setValue, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      image: undefined,
      resize: 'fill',
      showWishlistIcon: false,
      showAddToCart: true,
      showBuyNow: false,
      showQuantitySelector: true,
      addToCartText: 'Add to cart',
      buyNowText: 'Buy now',
      product: null,
    },
  });

  const watchedValues = watch();

  return (
    <>
      <Box padding={'050'}>
        <ImageResizing
          handleChange={(value) => setValue('resize', value)}
          label="Image resizing"
          selectedValue={watchedValues.resize as 'fill' | 'fit' | 'stretch'}
        />
        <ImageRatioSelector handleChange={(value) => null} label="Image ratio" selectedValue={'1:1'} />
        <ToggleWithIcon
          label="Wishlist icon"
          enabled={watchedValues.showWishlistIcon}
          onToggle={(value) => setValue('showWishlistIcon', value)}
        />
        <ActionGroup
          addToCart={watchedValues.showAddToCart}
          buyNow={watchedValues.showBuyNow}
          quantitySelector={watchedValues.showQuantitySelector}
          addToCartText={watchedValues.addToCartText}
          buyNowText={watchedValues.buyNowText}
          onToggleAddToCart={(value) => setValue('showAddToCart', value)}
          onToggleBuyNow={(value) => setValue('showBuyNow', value)}
          onToggleQuantity={(value) => setValue('showQuantitySelector', value)}
          onChangeAddToCartText={(value) => setValue('addToCartText', value)}
          onChangeBuyNowText={(value) => setValue('buyNowText', value)}
        />
        <div style={{ marginTop: '10px' }}>
          <Card>
            <ProductSelector
              onSelect={(value) => null}
              selectedProduct={watchedValues.product ? watchedValues.product : null}
              productTarget={null}
              label="Select Preview Product"
              placeholder="Search for a product"
            />
          </Card>
        </div>
      </Box>
    </>
  );
}
