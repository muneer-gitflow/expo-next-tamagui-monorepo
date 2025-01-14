import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  THEME_BY_ID_QUERY,
  VENDOR_BLOCKS_QUERY,
  THEMES_LIST_QUERY,
  SCREENS_QUERY,
  APP_ANALYTICS_QUERY,
  CREATE_VENDOR_BLOCK_MUTATION,
  GET_VENDOR_BLOCK_BY_UI_BLOCK,
  GET_BLOCK_DEFINITIONS,
  UPDATE_VENDOR_BLOCK_MUTATION,
} from "../graphql";

export const cmsApi = createApi({
  reducerPath: "cmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/cms",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchVendorBlocks: builder.query({
      query: ({ themeId, screenId }) => ({
        url: "",
        method: "POST",
        body: {
          query: VENDOR_BLOCKS_QUERY,
          variables: {
            themeId: themeId.toString(),
            screenId: screenId.toString(),
          },
          key: "vendor_blocks",
        },
      }),
    }),
    createVendorBlock: builder.mutation({
      query: ({
        vendorId,
        config,
        uiBlockId,
        themeId,
        screenId,
        index,
      }: {
        vendorId: string;
        config: Record<string, unknown> | Record<string, unknown>[] | null;
        uiBlockId: string;
        themeId: string;
        screenId: string;
        index: string;
      }) => ({
        url: "",
        method: "POST",
        body: {
          query: CREATE_VENDOR_BLOCK_MUTATION,
          variables: {
            vendorId,
            config,
            uiBlockId,
            themeId,
            screenId,
            index,
          },
          key: "create_vendor_blocks_item",
        },
      }),
    }),
    fetchThemeById: builder.query({
      query: (themeId: number) => ({
        url: "",
        method: "POST",
        body: {
          query: THEME_BY_ID_QUERY,
          variables: { themeId: themeId.toString() },
          key: "ui_themes_by_id",
        },
      }),
    }),
    fetchThemes: builder.query({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: THEMES_LIST_QUERY,
          key: "ui_themes",
        },
      }),
    }),
    fetchScreens: builder.query({
      query: ({ themeId }: { themeId: number }) => ({
        url: "",
        method: "POST",
        body: {
          query: SCREENS_QUERY,
          variables: { themeId: themeId.toString() },
          key: "screens",
        },
      }),
    }),
    fetchAnalytics: builder.query({
      query: ({
        startDate,
        endDate,
      }: { startDate?: string; endDate?: string } = {}) => ({
        url: "",
        method: "POST",
        body: {
          query: APP_ANALYTICS_QUERY,
          variables: {
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
          },
          key: "app_analytics",
        },
      }),
    }),
    getVendorBlockByUIBlock: builder.query({
      query: ({
        blockId,
        themeId,
        screenId,
      }: {
        blockId: string;
        themeId?: string;
        screenId?: string;
      }) => ({
        url: "",
        method: "POST",
        body: {
          query: GET_VENDOR_BLOCK_BY_UI_BLOCK,
          variables: {
            blockId,
            ...(themeId && { themeId }),
            ...(screenId && { screenId }),
          },
          key: "vendor_blocks",
        },
      }),
    }),
    getBlockDefinitions: builder.query({
      query: ({
        themeId,
        screenName,
      }: {
        themeId: string;
        screenName: string;
      }) => ({
        url: "",
        method: "POST",
        body: {
          query: GET_BLOCK_DEFINITIONS,
          variables: {
            themeId,
            screenName,
          },
          key: "ui_block_definitions",
        },
      }),
    }),
    updateVendorBlock: builder.mutation({
      query: ({ id, config }: { id: string; config: unknown }) => ({
        url: "",
        method: "POST",
        body: {
          query: UPDATE_VENDOR_BLOCK_MUTATION,
          variables: {
            id,
            config,
          },
          key: "update_vendor_blocks_item",
        },
      }),
    }),
  }),
});

export const {
  useFetchVendorBlocksQuery,
  useFetchThemeByIdQuery,
  useFetchThemesQuery,
  useFetchScreensQuery,
  useFetchAnalyticsQuery,
  useCreateVendorBlockMutation,
  useGetVendorBlockByUIBlockQuery,
  useGetBlockDefinitionsQuery,
  useUpdateVendorBlockMutation,
} = cmsApi;
