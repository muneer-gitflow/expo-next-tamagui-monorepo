import type { RootState } from 'app/lib/store/store';
import { Text, InlineGrid, Select, Button, TextField } from '@shopify/polaris';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StatusActiveIcon } from '@shopify/polaris-icons';
import { useSelector } from 'react-redux';
import CollectionSelector from '@/components/utils-components/collection-selector';
import { useFormMutation } from '@/app/contexts/form-mutation-context';
import type { UIBlock } from '@/lib/store/types';

const productsCountOptions = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
];

const schema = z.object({
  title: z.string().optional(),
  resize: z.enum(['fill', 'fit', 'stretch']).optional(),
  collectionTarget: z.object({
    navigationType: z.enum(['collection', 'products']),
    value: z.string(),
    label: z.string(),
  }),
  productsCount: z.string(),
  initialProducts: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CollectionListConfig({ block }: { block: UIBlock }) {
  const { saveData, isSaving } = useFormMutation();

  // get the initial products from the collection by the collection id using watched values
  const collectionDetails = useSelector((state: RootState) => state?.collections?.collectionDetails);

  const { setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: undefined,
      collectionTarget: undefined,
      productsCount: '2',
      initialProducts: [],
    },
  });

  const watchedValues = watch();

  return (
    <>
      <InlineGrid gap={'300'}>
        <InlineGrid>
          <Text fontWeight="medium" variant="bodyMd" as="span">
            Product Slider
          </Text>
          <Text variant="bodySm" tone="subdued" as="span">
            Drag & Drop to your Design
          </Text>
        </InlineGrid>
        <TextField
          autoComplete="off"
          label="Grid Title"
          value={watch('title')}
          onChange={(value) => setValue('title', value)}
        />
        <CollectionSelector
          selectedCollection={''}
          collectionTarget={watch('collectionTarget')?.value || ''}
          onSelect={(value) => {
            setValue('collectionTarget', value);
          }}
        />
        <div>
          <Select
            label="Number Of Products"
            options={productsCountOptions}
            onChange={(value) => setValue('productsCount', value)}
            value={watch('productsCount')}
          />
        </div>
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Image resizing
        </Text>
        <div
          style={{
            padding: '5px',
            background: '#F5F4F4',
            borderRadius: '7px',
            width: '100%',
            display: 'flex',
          }}
        >
          <button
            type="button"
            style={{
              width: 'calc(100% / 3)',
              height: '32px',
              border: 'none',
              borderRadius: '7px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: watch('resize') === 'fill' ? '#fff' : 'transparent',
            }}
            className={watch('resize') === 'fill' ? 'active' : ''}
            onClick={() => {
              setValue('resize', 'fill');
            }}
          >
            Fill
          </button>
          <button
            type="button"
            style={{
              width: 'calc(100% / 3)',
              height: '32px',
              border: 'none',
              borderRadius: '7px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: watch('resize') === 'fit' ? '#fff' : 'transparent',
            }}
            className={watch('resize') === 'fit' ? 'active' : ''}
            onClick={() => setValue('resize', 'fit')}
          >
            {/* <Icon source={ViewportWideIcon} tone="base" /> */}
            Fit
          </button>
          <button
            type="button"
            style={{
              width: 'calc(100% / 3)',
              height: '32px',
              border: 'none',
              borderRadius: '7px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: watch('resize') === 'stretch' ? '#fff' : 'transparent',
            }}
            className={watch('resize') === 'stretch' ? 'active' : ''}
            onClick={() => setValue('resize', 'stretch')}
          >
            {/* <Icon source={ViewportNarrowIcon} tone="base" /> */}
            Stretch
          </button>
        </div>
      </InlineGrid>

      <div style={{ marginTop: '24px' }}>
        <Button
          size="large"
          tone="success"
          fullWidth
          onClick={() =>
            saveData?.({
              config: {
                ...(watchedValues || {}),
                initialProducts:
                  (collectionDetails?.[watch('collectionTarget')?.value]?.products as unknown as Record<
                    string,
                    unknown
                  >) || [],
              },
            })
          }
          loading={isSaving}
          disabled={isSaving}
          icon={StatusActiveIcon}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </>
  );
}
