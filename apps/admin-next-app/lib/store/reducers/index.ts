import { combineReducers } from '@reduxjs/toolkit';
import dndReducer from './dnd.slice';
import themeReducer from './theme.slice';
import uiBlocksReducer from './ui-blocks.slice';
import simulatorReducer from './simulator.slice';
import appStateSlice from './app-state.slice';
import vendorBlocksReducer from './vendor-blocks.slice';
import productsReducer from './products.slice';
import collectionsReducer from './collections.slice';
import { cmsApi } from '@/lib/api/cms-api';

export const rootReducer = combineReducers({
  [cmsApi.reducerPath]: cmsApi.reducer,
  appState: appStateSlice,
  theme: themeReducer,
  uiBlocks: uiBlocksReducer,
  vendorBlocks: vendorBlocksReducer,
  simulator: simulatorReducer,
  products: productsReducer,
  collections: collectionsReducer,
  dnd: dndReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
