"use client";
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
import { useCallback, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigationTargetSelector from "@/components/utils-components/navigation-target-selector";
import { resolveImage } from "@/lib/cms";
import { useSelector } from "react-redux";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useFormMutation } from "@/app/contexts/form-mutation-context";
import BlockHeader from "@/components/ui/editor/block-header";
import { UIBlock, validImageTypes } from "@/lib/store/types";

interface Banner {
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
  banners: z.array(
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
  currentBanner: z.object({
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

export default function BannerImageSliderEditor({ block }: { block: UIBlock }) {
  const app = useAppBridge();
  const config = useSelector((state: RootState) => state.appState?.config);
  const currentBlock = useSelector(
    (state: RootState) => state.dnd?.currentBlock,
  );
  const blockConfig = currentBlock?.config as Banner[] | null;
  const initialConfig = currentBlock?.initialConfig as Banner[] | null;
  const { saveData, isSaving } = useFormMutation();

  const defaultBanners = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
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
    [],
  );

  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      banners: defaultBanners as Banner[],
      currentBanner: defaultBanners[0] as Banner,
    },
  });

  useEffect(() => {
    // Use blockConfig if available, otherwise fallback to initialConfig
    const configToUse = blockConfig?.length
      ? blockConfig
      : initialConfig?.length
      ? initialConfig
      : defaultBanners;

    if (configToUse) {
      setValue("banners", configToUse as Banner[]);
      setValue("currentBanner", configToUse[0] as Banner);
      app.toast.show("Data loaded from config!");
    }
  }, [blockConfig, initialConfig, defaultBanners, setValue, app.toast]);

  const [isUploading, setIsUploading] = useState(false);

  const handleDropZoneDrop = useCallback(
    async (
      _dropFiles: File[],
      acceptedFiles: File[],
      _rejectedFiles: File[],
    ) => {
      const banners = [...watch("banners")];
      const currentBanner = watch("currentBanner");
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
        banners[currentBanner.order - 1] = {
          ...banners[currentBanner.order - 1],
          image: resolveImage(result.id, config?.cmsBaseUrl || ""),
        };
        app.toast.show("Image uploaded!");
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsUploading(false);
      }

      setValue("banners", banners);
    },
    [setValue, watch, config, app.toast],
  );

  const watchedValues = watch();
  const currentBanner = watch("currentBanner");
  const fileUpload = !currentBanner?.image && <DropZone.FileUpload />;

  const collectionTarget = currentBanner?.collectionTarget;
  const productTarget = currentBanner?.productTarget;
  const urlTarget = currentBanner?.urlTarget;
  const pageTarget = currentBanner?.pageTarget;
  const selectedNavigationType = currentBanner?.navigationType as
    | "product"
    | "collection"
    | "page"
    | "url";

  const onRemove = useCallback(() => {
    console.log("onRemove");
  }, []);

  useEffect(() => {
    if (!watch("banners")) return;
    const updatedBanners = [...watch("banners")];
    updatedBanners[currentBanner?.order - 1] = currentBanner;
    setValue("banners", updatedBanners);
  }, [currentBanner, watch, setValue]);

  return (
    <>
      <BlockHeader
        onDelete={onRemove}
        title={"Banner Slider"}
        placeholder={"Update your Banner Slider Configuration"}
      />
      <InlineGrid gap={"300"}>
        <div
          style={{
            display: "flex",
            marginTop: "8px",
            gap: "11px",
          }}
        >
          {watch("banners").map((banner, index) => (
            <div key={banner.order}>
              {banner.image ? (
                <span
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setValue("currentBanner", banner);
                    }
                  }}
                  onClick={() => setValue("currentBanner", banner)}
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
                    source={banner.image}
                    alt={`Banner ${index + 1}`}
                    size="large"
                  />
                </span>
              ) : (
                <span
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setValue("currentBanner", banner);
                    }
                  }}
                  onClick={() => setValue("currentBanner", banner)}
                  style={{
                    width: "46px",
                    height: "40px",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border:
                      currentBanner?.order === banner?.order
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
            Upload Banner {currentBanner?.order}
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
                {currentBanner?.image && (
                  <img
                    src={currentBanner?.image}
                    alt="Banner Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover", // Ensures the image fills the container appropriately
                      objectPosition: "center", // Centers the image
                    }}
                  />
                )}
              </DropZone>
              {errors?.banners?.[currentBanner?.order - 1]?.image && (
                <Text variant="bodySm" tone="critical" as="p">
                  {errors.banners[currentBanner?.order - 1]?.image?.message}
                </Text>
              )}
            </div>
          )}
        </div>
        <Text fontWeight="medium" variant="bodyMd" as="span">
          Image resizing
        </Text>

        <div
          style={{
            padding: "5px",
            background: "#F5F4F4",
            borderRadius: "7px",
            width: "100%",
            display: "flex",
          }}
        >
          <button
            type="button"
            style={{
              width: "calc(100% / 3)",
              height: "32px",
              border: "none",
              borderRadius: "7px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                watch("banners")[currentBanner?.order - 1].resize === "fill"
                  ? "#fff"
                  : "transparent",
            }}
            className={
              watch("banners")[currentBanner?.order - 1].resize === "fill"
                ? "active"
                : ""
            }
            onClick={() => {
              const banners = [...watch("banners")];
              banners[currentBanner?.order - 1].resize = "fill";
              setValue("banners", banners);
            }}
          >
            Fill
          </button>
          <button
            type="button"
            style={{
              width: "calc(100% / 3)",
              height: "32px",
              border: "none",
              borderRadius: "7px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                watch("banners")[currentBanner?.order - 1].resize === "fit"
                  ? "#fff"
                  : "transparent",
            }}
            className={
              watch("banners")[currentBanner?.order - 1].resize === "fit"
                ? "active"
                : ""
            }
            onClick={() => {
              const banners = [...watch("banners")];
              banners[currentBanner?.order - 1].resize = "fit";
              console.log(banners, currentBanner);
              setValue("banners", banners);
            }}
          >
            {/* <Icon source={ViewportWideIcon} tone="base" /> */}
            Fit
          </button>
          <button
            type="button"
            style={{
              width: "calc(100% / 3)",
              height: "32px",
              border: "none",
              borderRadius: "7px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                watch("banners")[currentBanner?.order - 1].resize === "stretch"
                  ? "#fff"
                  : "transparent",
            }}
            className={
              watch("banners")[currentBanner?.order - 1].resize === "stretch"
                ? "active"
                : ""
            }
            onClick={() => {
              const banners = [...watch("banners")];
              banners[currentBanner?.order - 1].resize = "stretch";
              setValue("banners", banners);
            }}
          >
            {/* <Icon source={ViewportNarrowIcon} tone="base" /> */}
            Stretch
          </button>
        </div>
        <Text fontWeight="medium" variant="bodyMd" as="span">
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
              const currentBanner = watch("currentBanner");
              currentBanner.navigationType = "product";
              setValue("currentBanner", currentBanner);
            }}
          />
          <RadioButton
            label="Collection Page"
            checked={currentBanner?.navigationType === "collection"}
            name="navigate"
            id="collection"
            onChange={() => {
              const currentBanner = watch("currentBanner");
              currentBanner.navigationType = "collection";
              setValue("currentBanner", currentBanner);
            }}
          />
        </div>
      </InlineGrid>

      <Card>
        <div style={{ marginLeft: "16px" }}>
          {currentBanner?.navigationType ? (
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
                const updatedBanners = [...watch("banners")];
                updatedBanners[currentBanner?.order - 1] = {
                  ...updatedBanners[currentBanner?.order - 1],
                  navigationType,
                  navigateTo: value,
                  collectionTarget:
                    navigationType === "collection" ? value : null,
                  productTarget: navigationType === "product" ? value : null,
                  urlTarget: navigationType === "url" ? value : null,
                  pageTarget: navigationType === "page" ? value : null,
                };
                setValue("banners", updatedBanners);
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
                config: watchedValues?.banners as unknown as Record<
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
