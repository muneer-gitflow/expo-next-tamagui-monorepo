import { EmptyState } from '@shopify/polaris';
// import { useFormMutation } from '@/contexts/form-mutation-context';
import type { UIBlock } from '@/lib/store/types';

export default function ProductRecommendationsConfig({ block }: { block: UIBlock }) {
  // const { saveData, isSaving } = useFormMutation();

  return (
    <>
      <EmptyState
        heading="No Customization Available"
        action={{
          content: 'Contact Us',
          url: 'https://gitspark.com/contact?topic=product-recommendations-shopify-app-build',
        }}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>This field uses default Shopify Product Recommendations. For further customization, please contact us.</p>
      </EmptyState>
    </>
  );
}
