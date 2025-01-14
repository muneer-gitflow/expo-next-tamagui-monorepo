import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AppConfigType {
  appVersion: string;
  shopDomain: string;
  authServerBaseUrl: string;
  cmsBaseUrl: string;
  cmsStaticToken: string;
}

const initialState: { config: Partial<AppConfigType> } = {
  config: {
    appVersion: '1.0.0',
    cmsBaseUrl: '',
    cmsStaticToken: '',
  },
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setCMSBaseUrl: (state, action: PayloadAction<string>) => {
      state.config.cmsBaseUrl = action.payload;
    },
  },
});

export default appStateSlice.reducer;

export const { setCMSBaseUrl } = appStateSlice.actions;
