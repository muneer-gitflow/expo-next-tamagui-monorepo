import type { RootState } from 'app/lib/store/store';
import { Text, Card, InlineGrid, Button, RadioButton, Thumbnail, DropZone, Spinner } from '@shopify/polaris';
import { ImageIcon, StatusActiveIcon } from '@shopify/polaris-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import NavigationTargetSelector from '@/components/utils-components/navigation-target-selector';
import { resolveImage } from '@/lib/cms';
import { useSelector } from 'react-redux';

interface Banner {
  image?: string;
  resize?: 'fill' | 'fit' | 'stretch';
  navigateTo: string | null;
  navigationType: 'product' | 'collection' | 'page' | 'url' | null;
  id: string;
  collectionTarget: string | null;
  productTarget: string | null;
  urlTarget: string | null;
  pageTarget: string | null;
}

const schema = z.object({
  banners: z.array(
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
    }),
  ),
  activeBanner: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function BannerImageEditor() {
  const config = useSelector((state: RootState) => state.appState?.config);
  const { block } = useSelector((state: RootState) => state?.uiBlocks?.currentBlock);
  const vendorBlocks: {
    id: string;
    config: Banner[];
    ui_block: {
      id: string;
      block_id: string;
      name: string;
    };
  }[] = useSelector((state: RootState) => state.vendorBlocks.blocks);
  // current block id

  const currentBlockConfig = useMemo(() => {
    return vendorBlocks.find((vendorBlock) => block?.block_id === vendorBlock?.ui_block?.block_id);
  }, [vendorBlocks, block]);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const {
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      banners: Array.from({ length: 5 }, (_, i) => ({
        image: undefined,
        resize: 'fill',
        navigateTo: null,

        id: String(i + 1),
      })),
      activeBanner: '1',
    },
  });

  useEffect(() => {
    if (currentBlockConfig) {
      setValue('banners', currentBlockConfig.config as Banner[]);
    }
  }, [currentBlockConfig, setValue]);

  const handleDropZoneDrop = useCallback(
    async (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      const activeBannerIndex = Number(watch('activeBanner')) - 1;
      const banners = [...watch('banners')];

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

      setValue('banners', banners);
    },
    [setValue, watch, config],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const activeBannerIndex = Number(watch('activeBanner')) - 1;
  const currentBanner = watch('banners')[activeBannerIndex];
  const fileUpload = !currentBanner?.image && <DropZone.FileUpload />;

  const watchedValues = watch();
  const collectionTarget = watch('banners')[activeBannerIndex].collectionTarget;
  const productTarget = watch('banners')[activeBannerIndex].productTarget;
  const urlTarget = watch('banners')[activeBannerIndex].urlTarget;
  const pageTarget = watch('banners')[activeBannerIndex].pageTarget;
  const selectedNavigationType = watch('banners')[activeBannerIndex].navigationType as
    | 'product'
    | 'collection'
    | 'page'
    | 'url';

  useEffect(() => {
    console.log('watchedValues', watchedValues);
  }, [watchedValues]);

  const saveData = useCallback(
    async (data: FormValues) => {
      if (!isValid) {
        console.log('Form is not valid', errors);
        console.log('data', data);
        return;
      }

      setIsSaving(true);

      // Simulate an API call
      try {
        const response = await fetch('/app/api/vendor-theme', {
          method: 'POST',
          body: JSON.stringify({ config: data?.banners, ui_block_id: block?.id }),
        });
        const result = await response.json();
        console.log('result', result);
        // TODO -- success message
      } catch (error) {
        console.error('error', error);
        // TODO -- error message
      }
      console.log('Data saved!');

      setIsSaving(false);
    },
    [isValid, errors, block],
  );

  // useEffect(() => {
  //   saveData(watchedValues);
  // }, [watchedValues, saveData]);

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '16px', gap: '16px' }}>
          <Text variant="headingLg" as="h2">
            Banner Slider
          </Text>
          <Text variant="bodyMd" as="p" tone="subdued">
            Please upload your Banners to Sliders
          </Text>
        </div>

        <InlineGrid gap="300" columns={5}>
          {watch('banners').map((banner, index) => (
            <div key={banner.id}>
              {banner.image ? (
                <div
                  onClick={() => setValue('activeBanner', banner.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#f1f1f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Thumbnail source={banner.image} alt={`Banner ${index + 1}`} size="large" />
                </div>
              ) : (
                <div
                  onClick={() => setValue('activeBanner', banner.id)}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#f1f1f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: watch('activeBanner') === banner.id ? '2px solid #17d540' : 'none',
                    borderRadius: watch('activeBanner') === banner.id ? '8px' : '0px',
                  }}
                >
                  <ImageIcon />
                </div>
              )}
            </div>
          ))}
        </InlineGrid>

        <div style={{ marginTop: '24px' }}>
          <Text variant="headingMd" as="h3">
            Upload Banner {watch('activeBanner')}
          </Text>
          {isUploading ? (
            <div
              style={{
                marginTop: '16px',
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
            <div style={{ marginTop: '16px' }}>
              <DropZone allowMultiple={false} accept={validImageTypes.join(',')} onDrop={handleDropZoneDrop}>
                {fileUpload}
                {currentBanner?.image && (
                  <img
                    src={currentBanner.image}
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
              {errors?.banners?.[activeBannerIndex]?.image && (
                <Text variant="bodySm" tone="critical" as="p">
                  {errors.banners[activeBannerIndex].image?.message}
                </Text>
              )}
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px' }}>
          <Text variant="headingMd" as="h3">
            Image resizing
          </Text>
          <InlineGrid gap="300" columns={3}>
            <Button pressed={true}>Fill</Button>
            <Button>Fit</Button>
            <Button>Stretch</Button>
          </InlineGrid>
        </div>

        <div style={{ marginTop: '24px' }}>
          <Text variant="headingLg" as="h3">
            Navigate to
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <RadioButton
              label="Product Page"
              checked={currentBanner.navigationType === 'product'}
              name="navigate"
              id="product"
              onChange={() => {
                const updatedBanners = [...watch('banners')];
                updatedBanners[activeBannerIndex] = {
                  ...updatedBanners[activeBannerIndex],
                  navigationType: 'product',
                };
                setValue('banners', updatedBanners);
              }}
            />
            <RadioButton
              label="Collection Page"
              checked={currentBanner.navigationType === 'collection'}
              name="navigate"
              id="collection"
              onChange={() => {
                const updatedBanners = [...watch('banners')];
                updatedBanners[activeBannerIndex] = {
                  ...updatedBanners[activeBannerIndex],
                  navigationType: 'collection',
                };
                setValue('banners', updatedBanners);
              }}
            />
            <RadioButton
              label="URL"
              checked={currentBanner.navigationType === 'url'}
              name="navigate"
              id="url"
              onChange={() => {
                const updatedBanners = [...watch('banners')];
                updatedBanners[activeBannerIndex] = {
                  ...updatedBanners[activeBannerIndex],
                  navigationType: 'url',
                };
                setValue('banners', updatedBanners);
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginLeft: '16px' }}>
        {watch('banners')[activeBannerIndex].navigationType ? (
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
              const updatedBanners = [...watch('banners')];
              updatedBanners[activeBannerIndex] = {
                ...updatedBanners[activeBannerIndex],
                navigationType,
                navigateTo: value,
                collectionTarget: navigationType === 'collection' ? value : null,
                productTarget: navigationType === 'product' ? value : null,
                urlTarget: navigationType === 'url' ? value : null,
                pageTarget: navigationType === 'page' ? value : null,
              };
              setValue('banners', updatedBanners);
            }}
          />
        ) : null}
      </div>

      <div style={{ marginTop: '24px' }}>
        <Button
          size="large"
          tone="success"
          fullWidth
          onClick={() => saveData(watchedValues)}
          loading={isSaving}
          disabled={isSaving}
          icon={StatusActiveIcon}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Card>
  );
}
