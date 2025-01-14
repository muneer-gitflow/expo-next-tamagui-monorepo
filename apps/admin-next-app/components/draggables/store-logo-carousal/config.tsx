import type { RootState } from "@/lib/store/store";
import {
  Text,
  Card,
  InlineGrid,
  Button,
  RadioButton,
  Thumbnail,
  DropZone,
  Spinner,
} from "@shopify/polaris";
import { StatusActiveIcon } from "@shopify/polaris-icons";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigationTargetSelector from "@/components/utils-components/navigation-target-selector";
import { resolveImage } from "@/lib/cms";
import { useSelector } from "react-redux";
import { useAppBridge } from "@shopify/app-bridge-react";
import { validImageTypes } from "@/lib/store/types";
import type { UIBlock } from "@/lib/store/types";
import { useFormMutation } from '@/app/contexts/form-mutation-context';
import BlockHeader from "@/components/ui/editor/block-header";

interface Brand {
  image?: string;
  resize?: "fill" | "fit" | "stretch";
  navigateTo: string | null;
  navigationType: "product" | "collection" | "page" | "url" | null;
  id: string;
  collectionTarget: string | null;
  productTarget: string | null;
  urlTarget: string | null;
  pageTarget: string | null;
  order: number;
}

const schema = z.object({
  brands: z.array(
    z.object({
      image: z.string().optional(),
      resize: z.enum(["fill", "fit", "stretch"]).optional(),
      navigateTo: z.string().nullable(),
      navigationType: z
        .enum(["product", "collection", "page", "url"])
        .nullable(),
      collectionTarget: z.string().nullable(),
      productTarget: z.string().nullable(),
      urlTarget: z.string().nullable(),
      pageTarget: z.string().nullable(),
      order: z.number(),
    }),
  ),
  currentBrand: z.object({
    image: z.string().optional(),
    resize: z.enum(["fill", "fit", "stretch"]).optional(),
    navigateTo: z.string().nullable(),
    navigationType: z.enum(["product", "collection", "page", "url"]).nullable(),
    collectionTarget: z.string().nullable(),
    productTarget: z.string().nullable(),
    urlTarget: z.string().nullable(),
    pageTarget: z.string().nullable(),
    order: z.number(),
  }),
});

type FormValues = z.infer<typeof schema>;

export default function StoreLogoCarouselConfig({ block }: { block: UIBlock }) {
  const app = useAppBridge();
  const config = useSelector((state: RootState) => state.appState?.config);
  const currentBlock = useSelector(
    (state: RootState) => state.dnd?.currentBlock,
  );
  const blockConfig = currentBlock?.config as Brand[] | null;
  const initialConfig = currentBlock?.initialConfig as Brand[] | null;
  const { saveData, isSaving } = useFormMutation();

  const [isUploading, setIsUploading] = useState(false);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      brands: Array.from({ length: 5 }, (_, i) => ({
        image: undefined,
        resize: "fill",
        navigateTo: null,
        navigationType: null,
        collectionTarget: null,
        productTarget: null,
        urlTarget: null,
        pageTarget: null,
        order: i + 1,
      })),
      currentBrand: {
        image: undefined,
        resize: "fill",
        navigateTo: null,
        navigationType: null,
        collectionTarget: null,
        productTarget: null,
        urlTarget: null,
        pageTarget: null,
        order: 1,
      },
    },
  });

  useEffect(() => {
    if (blockConfig) {
      setValue("brands", blockConfig as Brand[]);
      setValue("currentBrand", blockConfig[0] as Brand);
      app.toast.show("Data loaded from config!");
      return;
    }

    if (initialConfig) {
      setValue("brands", initialConfig as Brand[]);
      setValue("currentBrand", initialConfig[0] as Brand);
      app.toast.show("Data loaded from initialConfig!");
    }
  }, [blockConfig, initialConfig, setValue, app.toast]);

  const handleDropZoneDrop = useCallback(
    async (
      _dropFiles: File[],
      acceptedFiles: File[],
      _rejectedFiles: File[],
    ) => {
      const brands = [...watch("brands")];
      const currentBrand = watch("currentBrand");
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      try {
        setIsUploading(true);
        const response = await fetch("/app/api", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        // update current banner image
        brands[currentBrand.order - 1] = {
          ...brands[currentBrand.order - 1],
          image: resolveImage(result.id, config?.cmsBaseUrl || ""),
        };
        app.toast.show("Image uploaded!");
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsUploading(false);
      }

      setValue("brands", brands);
    },
    [setValue, watch, config, app.toast],
  );

  const watchedValues = watch();
  const currentBrand = watch("currentBrand");

  const fileUpload = !currentBrand?.image && <DropZone.FileUpload />;

  const collectionTarget = currentBrand?.collectionTarget;
  const productTarget = currentBrand?.productTarget;
  const urlTarget = currentBrand?.urlTarget;
  const pageTarget = currentBrand?.pageTarget;
  const selectedNavigationType = currentBrand?.navigationType as
    | "product"
    | "collection"
    | "page"
    | "url";

  useEffect(() => {
    const updatedBrands = [...watch("brands")];
    updatedBrands[currentBrand?.order - 1] = currentBrand;
    setValue("brands", updatedBrands);
  }, [currentBrand, watch, setValue]);

  const brands = watch("brands");

  const onRemove = useCallback(() => {
    console.log("onRemove");
  }, []);

  return (
    <>
      <BlockHeader
        onDelete={onRemove}
        title={"Display a group of brands"}
        placeholder={"Update your configuration here"}
      />
      <InlineGrid gap={"300"}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          {brands.map((brand, index) => (
            <div key={brand.order}>
              {brand.image ? (
                <span
                  onClick={() => setValue("currentBrand", brand)}
                  onKeyUp={() => setValue("currentBrand", brand)}
                  style={{
                    width: "46px",
                    height: "40px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Thumbnail
                    source={brand.image}
                    alt={`Brand ${index + 1}`}
                    size="large"
                  />
                </span>
              ) : (
                <span
                  onClick={() => setValue("currentBrand", brand)}
                  onKeyUp={() => setValue("currentBrand", brand)}
                  style={{
                    width: "46px",
                    height: "40px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border:
                      currentBrand?.order === brand?.order
                        ? "2px solid #303030"
                        : "none",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src="/imageUploadPlaceholder.svg"
                    width={21}
                    alt="Banner placeholder"
                  />
                </span>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexDirection: "column",
            border: "#DEDEDE solid 1px",
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <Text fontWeight="medium" variant="bodyMd" as="span">
            Upload Image {currentBrand?.order}
          </Text>
          {isUploading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid #f1f1f1",
                padding: "32px",
                borderRadius: "8px",
              }}
            >
              <Spinner size="large" />
            </div>
          ) : (
            <div>
              <DropZone
                allowMultiple={false}
                accept={validImageTypes.join(",")}
                onDrop={handleDropZoneDrop}
              >
                {fileUpload}
                {currentBrand?.image && (
                  <img
                    src={currentBrand?.image}
                    alt="Brand Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover", // Ensures the image fills the container appropriately
                      objectPosition: "center", // Centers the image
                    }}
                  />
                )}
              </DropZone>
              {errors?.brands?.[currentBrand?.order - 1]?.image && (
                <Text variant="bodySm" tone="critical" as="p">
                  {errors.brands[currentBrand?.order - 1]?.image?.message}
                </Text>
              )}
            </div>
          )}
        </div>
        {/* <ImageResizer watch={watch} setValue={setValue} activeItemIndex={currentBanner?.order - 1} /> */}
        <Text fontWeight="bold" variant="bodyMd" as="span">
          Navigate to
        </Text>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "8px",
          }}
        >
          <RadioButton
            label="Product Page"
            checked={selectedNavigationType === "product"}
            name="navigate"
            id="product"
            onChange={() => {
              const currentBrand = watch("currentBrand");
              currentBrand.navigationType = "product";
              setValue("currentBrand", currentBrand);
            }}
          />
          <RadioButton
            label="Collection Page"
            checked={currentBrand?.navigationType === "collection"}
            name="navigate"
            id="collection"
            onChange={() => {
              const currentBrand = watch("currentBrand");
              currentBrand.navigationType = "collection";
              setValue("currentBrand", currentBrand);
            }}
          />
        </div>
      </InlineGrid>

      <Card>
        <div style={{ marginLeft: "16px" }}>
          {currentBrand?.navigationType ? (
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
                navigationType: "product" | "collection" | "page" | "url";
                value: string;
                label: string;
              }) => {
                const updatedBrands = [...watch("brands")];
                updatedBrands[currentBrand?.order - 1] = {
                  ...updatedBrands[currentBrand?.order - 1],
                  navigationType,
                  navigateTo: value,
                  collectionTarget:
                    navigationType === "collection" ? value : null,
                  productTarget: navigationType === "product" ? value : null,
                  urlTarget: navigationType === "url" ? value : null,
                  pageTarget: navigationType === "page" ? value : null,
                };
                setValue("brands", updatedBrands);
              }}
            />
          ) : null}
        </div>

        <div style={{ marginTop: "24px" }}>
          <Button
            size="large"
            tone="success"
            fullWidth
            onClick={() => {
              saveData?.({
                config: watchedValues?.brands as unknown as Record<
                  string,
                  unknown
                >,
              });
            }}
            loading={isSaving}
            disabled={isSaving}
            icon={StatusActiveIcon}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </Card>
    </>
  );
}
