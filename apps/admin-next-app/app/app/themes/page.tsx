import { Page, BlockStack } from "@shopify/polaris";
import ThemesGrid from "@/components/themes-grid";
import {
  setActiveTheme,
  setThemesList,
} from "@/lib/store/reducers/theme.slice";
import type { RootState, AppDispatch } from "@/lib/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchThemesQuery } from "@/lib/api/cms-api";
import ActiveThemeCard from "@/components/active-theme-card";

export default function ThemeSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: themes, isLoading } = useFetchThemesQuery({});
  const cmsBaseUrl = useSelector(
    (state: RootState) => state.appState.config.cmsBaseUrl,
  );
  const activeTheme = useSelector(
    (state: RootState) => state.theme.activeTheme,
  );

  useEffect(() => {
    if (themes) {
      dispatch(setThemesList(themes));
      if (themes.length > 0 && !activeTheme) {
        dispatch(setActiveTheme(themes[0]));
      }
    }
  }, [themes, dispatch, activeTheme]);

  return (
    <Page
      title="Themes"
      subtitle="Customize your app's appearance with our pre-built themes or create your own."
    >
      <BlockStack gap="400">
        <ActiveThemeCard isLoading={isLoading} />
        <ThemesGrid
          isLoading={isLoading}
          themes={themes}
          cmsBaseUrl={cmsBaseUrl || ""}
        />
      </BlockStack>
    </Page>
  );
}
