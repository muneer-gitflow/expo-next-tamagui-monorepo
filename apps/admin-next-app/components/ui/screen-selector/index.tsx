import { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { Icon, Text, Button } from "@shopify/polaris";
import { ChevronDownIcon, PlusIcon } from "@shopify/polaris-icons";
import styles from "./screen-selector.module.css";
import { useFetchScreensQuery } from "@/lib/api/cms-api";
import { setCurrentScreen } from "@/lib/store/reducers/theme.slice";
import { setInitialBlocks } from "@/lib/store/reducers/dnd.slice";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export interface Screen {
  id: number;
  name: string;
  display_name: string;
  premium?: boolean;
  icon?: string;
}

export interface ScreenGroup {
  id: number;
  name: string;
  display_name: string;
  screen_variants: Screen[];
  premium?: boolean;
  icon?: string;
}

// Helper to convert stubbed data into sections for rendering
function createScreenSections(screens: ScreenGroup[]): {
  title: string;
  id: number;
  name: string;
  display_name: string;
  icon: string;
  premium: boolean;
  encoded_id: string;
  screens: {
    id: number;
    name: string;
    display_name: string;
    variant_id: number;
    encoded_id: string;
  }[];
}[] {
  return screens.map((screen) => ({
    title: screen.display_name,
    id: screen.id,
    name: screen.name,
    display_name: screen.display_name,
    icon: screen.icon || "",
    premium: screen.premium || false,
    encoded_id: btoa(`${screen.name}-${screen.id}`),
    screens: screen.screen_variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      display_name: variant.display_name,
      variant_id: variant.id,
      encoded_id: btoa(
        `${screen.name}-${screen.id}-${variant.name}-${variant.id}`,
      ),
    })),
  }));
}

export default function ScreenSelector() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const themeId = params.id;
  const uiBlocks = useSelector((state: RootState) => state.uiBlocks.blocks);

  const { data: screensResponse } = useFetchScreensQuery(
    { themeId: Number(themeId) },
    {
      skip: !themeId,
    },
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentScreen = useSelector(
    (state: RootState) => state.theme.currentScreen,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScreenSelect = useCallback(
    (encoded_id: string) => {
      setIsOpen(false);

      const url = `/app/theme/${themeId}?screen=${encoded_id}`;
      router.push(url);
    },
    [router, themeId],
  );

  useEffect(() => {
    const screenData = params.screen;
    if (!screenData) return;

    const decodedScreen = atob(screenData as string);
    const paramlis = decodedScreen.split("-");
    const screenId = paramlis[1];
    const variantId = paramlis[3];

    // get from screens array
    const screen = screensResponse?.find(
      (item: { id: number; name: string; display_name: string }) =>
        Number(item.id) === Number(screenId),
    );
    const variant = screen?.screen_variants.find(
      (item: { id: number; name: string; display_name: string }) =>
        Number(item.id) === Number(variantId),
    );

    if (!screen) {
      return;
    }

    dispatch(
      setCurrentScreen({
        screen: screen,
        variant: variant || null,
      }),
    );

    // these screens need to have initial blocks
    const INITAL_BLOCK_SCREENS = [
      "cart",
      "collection_details",
      "product_details",
    ];

    if (!INITAL_BLOCK_SCREENS.includes(screen?.name)) {
      return;
    }

    if (uiBlocks.length > 0) {
      const payload = uiBlocks.map((block) => ({
        ...block,
        id: `${block.id}-${Date.now()}`,
        config: block.initialConfig,
        index: "0",
      }));
      dispatch(setInitialBlocks(payload));
    }
  }, [params, dispatch, screensResponse, uiBlocks]);

  const handleCreateScreen = useCallback(() => {
    console.log("Create new screen");
    setIsOpen(false);
  }, []);

  // Generate screen sections from stubbed data
  const SCREEN_SECTIONS = useMemo(() => {
    if (!screensResponse) return [];
    return createScreenSections(screensResponse);
  }, [screensResponse]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <Text as="span">
          Screen:-{" "}
          {currentScreen?.variant?.display_name ||
            currentScreen?.display_name ||
            "Select Screen"}
        </Text>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}>
          <Icon source={ChevronDownIcon} tone="base" />
        </span>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Text as="span" tone="subdued">
                Custom Screen
              </Text>
            </div>
            <div className={styles.createButtonWrapper}>
              <Button
                icon={PlusIcon}
                onClick={handleCreateScreen}
                variant="plain"
                textAlign="left"
                fullWidth
              >
                Create new screen
              </Button>
            </div>
          </div>

          {SCREEN_SECTIONS.map((section) => (
            <div key={section.title} className={styles.section}>
              {section?.screens?.length > 1 ? (
                section?.screens?.map((variant) => (
                  <button
                    type="button"
                    className={`${styles.option} ${
                      currentScreen?.variant_id === variant.id
                        ? styles.selected
                        : ""
                    }`}
                    key={variant.encoded_id}
                    onClick={() => handleScreenSelect(variant.encoded_id)}
                  >
                    <Text as="span">{variant.display_name}</Text>
                  </button>
                ))
              ) : (
                <button
                  key={section.title}
                  type="button"
                  className={`${styles.option} ${
                    currentScreen?.id === section.id ? styles.selected : ""
                  }`}
                  onClick={() => handleScreenSelect(section.encoded_id)}
                >
                  <Text as="span">{section.display_name}</Text>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
