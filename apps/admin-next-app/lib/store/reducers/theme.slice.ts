import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AppTheme,
  AppThemeState,
  SimulatedScreenType,
} from "@/lib/store/types";
import type { RootState } from "@/lib/store/store";

export const setThemesList = createAsyncThunk(
  "theme/setThemesList",
  async (themes: AppTheme[]) => {
    return themes;
  },
);

// Initial state
const initialState: AppThemeState = {
  themes: [],
  activeTheme: null,
  loading: false,
  error: null,
  currentScreen: null,
  screens: [],
};

// Theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setActiveTheme: (state, action: PayloadAction<AppTheme>) => {
      state.activeTheme = action.payload;
    },
    setCurrentScreen: (
      state,
      action: PayloadAction<{
        screen: SimulatedScreenType;
        variant?: SimulatedScreenType;
      }>,
    ) => {
      state.currentScreen = {
        ...action.payload.screen,
        variant: action.payload.variant,
      };
    },
    setScreens: (state, action: PayloadAction<SimulatedScreenType[]>) => {
      state.screens = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setThemesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch themes";
      })
      .addCase(
        setThemesList.fulfilled,
        (state, action: PayloadAction<AppTheme[]>) => {
          state.themes = action.payload;
        },
      );
  },
});

export const { setActiveTheme, setCurrentScreen, setScreens } =
  themeSlice.actions;
export default themeSlice.reducer;

export const getCurrentScreen = (screenName: string) => (state: RootState) =>
  state.theme.screens.find((screen) => screen.name === screenName);
