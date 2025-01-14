import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  config: {
    cmsBaseUrl: string | null;
  };
}

const initialState: AppState = {
  config: {
    cmsBaseUrl: null,
  },
};

const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<{ cmsBaseUrl: string }>) => {
      state.config = action.payload;
    },
  },
});

export const { setConfig } = appSlice.actions;
export default appSlice.reducer; 