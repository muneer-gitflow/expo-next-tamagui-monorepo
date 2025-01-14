import type { RootState } from '@/lib/store/store';
import { Text, InlineGrid, Button, RadioButton, Thumbnail, DropZone, Spinner, Box, TextField } from '@shopify/polaris';
import { StatusActiveIcon } from '@shopify/polaris-icons';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import NavigationTargetSelector from '@/components/utils-components/navigation-target-selector';
import { resolveImage } from '@/lib/cms';
import { useSelector } from 'react-redux';
import ImageResizing from '@/components/utils-components/image-resizing';
import type { UIBlock } from '@/lib/store/types';
import { useFormMutation } from '@/app/contexts/form-mutation-context';

export interface CategoryLabelType {
  image?: string;
  resize?: 'fill' | 'fit' | 'stretch';
  navigateTo: string | null;
  navigationType: 'product' | 'collection' | 'page' | 'url' | null;
  id: string;
  collectionTarget: string | null;
  productTarget: string | null;
  urlTarget: string | null;
  pageTarget: string | null;
  displayText: string | null;
}

const schema = z.object({
  activeCircleItem: z.string(),
  categoryLabels: z.array(
    z.object({
      image: z.string().optional(),
      resize: z.enum(['fill', 'fit', 'stretch']).optional(),
      navigateTo: z.string().nullable(),
      navigationType: z.enum(['product', 'collection', 'page', 'url']).nullable(),
      collectionTarget: z.string().nullable(),
      productTarget: z.string().nullable(),
      urlTarget: z.string().nullable(),
      pageTarget: z.string().nullable(),
      id: z.string(),
      displayText: z.string().nullable(),
    }),
  ),
});

type FormValues = z.infer<typeof schema>;

export default function CategoryLabelsConfig({ block }: { block: UIBlock }) {
  const config = useSelector((state: RootState) => state.appState?.config);
  const currentBlock = useSelector((state: RootState) => state.dnd.currentBlock);
  const { saveData, isSaving } = useFormMutation();

  // current block id

  const [isUploading, setIsUploading] = useState(false);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoryLabels: Array.from({ length: 5 }, (_, i) => ({
        image: undefined,
        resize: 'fill',
        navigateTo: null,
        navigationType: null,
        collectionTarget: null,
        productTarget: null,
        urlTarget: null,
        pageTarget: null,
        id: String(i + 1),
        displayText: null,
      })),
      activeCircleItem: '1',
    },
  });

  useEffect(() => {
    if (currentBlock?.config) {
      setValue('categoryLabels', currentBlock.config as unknown as CategoryLabelType[]);
    }
  }, [currentBlock, setValue]);

  const handleDropZoneDrop = useCallback(
    async (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      const activeBannerIndex = Number(watch('activeCircleItem')) - 1;
      const banners = [...watch('categoryLabels')];
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      try {
        setIsUploading(true);
        const response = await fetch('/app/api', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        // update current banner image
        banners[activeBannerIndex] = {
          ...banners[activeBannerIndex],
          image: resolveImage(result.id, config?.cmsBaseUrl || ''),
        };
      } catch (error) {
        console.error('error', error);
      } finally {
        setIsUploading(false);
      }

      setValue('categoryLabels', banners);
    },
    [setValue, watch, config],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const activeItemIndex = Number(watch('activeCircleItem')) - 1;
  const currentItem = watch('categoryLabels')[activeItemIndex];
  const fileUpload = !currentItem?.image && <DropZone.FileUpload />;

  const watchedValues = watch();
  const collectionTarget = watch('categoryLabels')[activeItemIndex].collectionTarget;
  const productTarget = watch('categoryLabels')[activeItemIndex].productTarget;
  const urlTarget = watch('categoryLabels')[activeItemIndex].urlTarget;
  const pageTarget = watch('categoryLabels')[activeItemIndex].pageTarget;
  const selectedNavigationType = watch('categoryLabels')[activeItemIndex].navigationType as
    | 'product'
    | 'collection'
    | 'page'
    | 'url';

  return (
    <>
      <InlineGrid gap={'300'}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          {watch('categoryLabels').map((item, index) => (
            <div key={item.id}>
              {item.image ? (
                <span
                  onClick={() => setValue('activeCircleItem', item.id)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      setValue('activeCircleItem', item.id);
                    }
                  }}
                  style={{
                    width: '46px',
                    height: '40px',
                    background: '#f1f1f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Thumbnail source={item.image} alt={`Banner ${index + 1}`} size="large" />
                </span>
              ) : (
                <span
                  onClick={() => setValue('activeCircleItem', item.id)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      setValue('activeCircleItem', item.id);
                    }
                  }}
                  style={{
                    width: '46px',
                    height: '40px',
                    background: '#f1f1f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: watch('activeCircleItem') === item.id ? '2px solid #303030' : 'none',
                    borderRadius: '8px',
                  }}
                >
                  <img src="/imageUploadPlaceholder.svg" width={21} alt="Category placeholder" />
                </span>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
            border: '#DEDEDE solid 1px',
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <Text fontWeight="medium" variant="bodyMd" as="span">
            Upload Thumbnail For Category {watch('activeCircleItem')}
          </Text>
          {isUploading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid #f1f1f1',
                padding: '32px',
                borderRadius: '8px',
              }}
            >
              <Spinner size="large" />
            </div>
          ) : (
            <div>
              <DropZone allowMultiple={false} accept={validImageTypes.join(',')} onDrop={handleDropZoneDrop}>
                {fileUpload}
                {currentItem?.image && (
                  <img
                    src={currentItem.image}
                    alt="Banner Preview"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover', // Ensures the image fills the container appropriately
                      objectPosition: 'center', // Centers the image
                    }}
                  />
                )}
              </DropZone>
              {errors?.categoryLabels?.[activeItemIndex]?.image && (
                <Text variant="bodySm" tone="critical" as="p">
                  {errors.categoryLabels[activeItemIndex].image?.message}
                </Text>
              )}
            </div>
          )}
        </div>
      </InlineGrid>
      <Box paddingBlockStart={'300'} paddingBlockEnd={'300'}>
        <TextField
          autoComplete="off"
          label="Display Text"
          value={watch('categoryLabels')[activeItemIndex].displayText || ''}
          onChange={(value) => {
            const items = [...watch('categoryLabels')];
            items[activeItemIndex].displayText = value;
            setValue('categoryLabels', items);
          }}
        />
      </Box>
      <ImageResizing
        handleChange={(value) => null}
        label="Image resizing"
        selectedValue={currentItem.resize as 'fill' | 'fit' | 'stretch'}
      />
      <Text fontWeight="medium" variant="bodyMd" as="span">
        Navigate to
      </Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <RadioButton
          label="Product Page"
          checked={currentItem.navigationType === 'product'}
          name="navigate"
          id="product"
          onChange={() => {
            const items = [...watch('categoryLabels')];
            items[activeItemIndex] = {
              ...items[activeItemIndex],
              navigationType: 'product',
            };
            setValue('categoryLabels', items);
          }}
        />
        <RadioButton
          label="Collection Page"
          checked={currentItem.navigationType === 'collection'}
          name="navigate"
          id="collection"
          onChange={() => {
            const items = [...watch('categoryLabels')];
            items[activeItemIndex] = {
              ...items[activeItemIndex],
              navigationType: 'collection',
            };
            setValue('categoryLabels', items);
          }}
        />
        <RadioButton
          label="URL"
          checked={currentItem.navigationType === 'url'}
          name="navigate"
          id="url"
          onChange={() => {
            const items = [...watch('categoryLabels')];
            items[activeItemIndex] = {
              ...items[activeItemIndex],
              navigationType: 'url',
            };
            setValue('categoryLabels', items);
          }}
        />
      </div>

      {watch('categoryLabels')[activeItemIndex].navigationType ? (
        <Box padding={'300'} borderWidth="0165" borderRadius="200" borderColor="border">
          <InlineGrid gap={'300'}>
            <NavigationTargetSelector
              collectionTarget={collectionTarget}
              productTarget={productTarget}
              urlTarget={urlTarget}
              pageTarget={pageTarget}
              selectedNavigationType={selectedNavigationType}
              onSelect={({
                navigationType,
                value,
              }: {
                navigationType: 'product' | 'collection' | 'page' | 'url';
                value: string;
                label: string;
              }) => {
                const items = [...watch('categoryLabels')];
                items[activeItemIndex] = {
                  ...items[activeItemIndex],
                  navigationType,
                  navigateTo: value,
                  collectionTarget: navigationType === 'collection' ? value : null,
                  productTarget: navigationType === 'product' ? value : null,
                  urlTarget: navigationType === 'url' ? value : null,
                  pageTarget: navigationType === 'page' ? value : null,
                };
                setValue('categoryLabels', items);
              }}
            />
          </InlineGrid>
        </Box>
      ) : null}

      <div style={{ marginTop: '24px' }}>
        <Button
          size="large"
          tone="success"
          fullWidth
          onClick={() =>
            saveData?.({
              config: watchedValues?.categoryLabels as unknown as Record<string, unknown>,
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
