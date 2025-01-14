// tracks vendor configuration for a given theme
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { VendorBlock } from '../types';
import type { RootState } from '../store';

type VendorBlocksState = {
  blocks: VendorBlock[];
  currentBlock: VendorBlock | null;
  screens: {
    [screenId: string]: {
      vendorBlocks: VendorBlock[];
      isLoading: boolean;
    };
  };
  currentScreenBlocks: VendorBlock[];
};

// action to delete a vendor block
export const deleteVendorBlock = createAsyncThunk(
  'vendorBlocks/deleteVendorBlock',
  async (
    payload: { vendorBlock: VendorBlock; screenId: string },
    { rejectWithValue, getState },
  ): Promise<{ data: unknown; screenId: string; vendorBlock: VendorBlock } | unknown> => {
    const { vendorBlock, screenId } = payload;

    // call fetch api to delete the vendor block
    // need to check what do we need to pass here

    try {
      const response = await fetch('/app/api/vendor-blocks', {
        method: 'DELETE',
        body: JSON.stringify({
          vendorBlockId: vendorBlock.id,
          screenId: screenId,
        }),
      });

      const { data } = await response.json();

      return { ...data, ...payload };
    } catch (error) {
      console.error('Error deleting vendor block:', error);
      return rejectWithValue(error);
    }
  },
);

const vendorBlocksSlice = createSlice({
  name: 'vendorBlocks',
  initialState: {
    blocks: [],
    currentBlock: null,
    screens: {},
    currentScreenBlocks: [],
  } as VendorBlocksState,
  reducers: {
    setVendorBlocks: (state, action: PayloadAction<VendorBlock[]>) => {
      state.screens = mapVendorBlocksToScreens(action.payload);
      state.blocks = action.payload;
      // if blocks are there set last block as current block
      if (action.payload.length > 0) {
        state.currentBlock = action.payload[action.payload.length - 1];
      }
    },
    clearVendorBlocks: (state) => {
      state.blocks = [];
    },
    setCurrentVendorBlock: (state, action: PayloadAction<VendorBlock>) => {
      const existingBlock = state.blocks.find((block) => block.ui_block.block_id === action.payload.ui_block.block_id);
      if (existingBlock) {
        state.currentBlock = { ...existingBlock, config: action.payload.config };
      } else {
        state.currentBlock = { ...action.payload, isDraft: true, config: action.payload.config };
      }
    },
    clearCurrentVendorBlock: (state) => {
      state.currentBlock = null;
    },
  },
  extraReducers: (builder) => {
    // loading state for curnet screen get screen id from payload meta
    builder.addCase(deleteVendorBlock.pending, (state, action) => {
      state.screens[action.meta.arg.screenId].isLoading = true;
    });
    builder.addCase(deleteVendorBlock.rejected, (state, action) => {
      state.screens[action.meta.arg.screenId].isLoading = false;
    });
  },
});

export const { setVendorBlocks, clearVendorBlocks, setCurrentVendorBlock, clearCurrentVendorBlock } =
  vendorBlocksSlice.actions;

export default vendorBlocksSlice.reducer;

export const getVendorBlocksByScreenId = (state: RootState) =>
  state.theme.currentScreen?.id ? state.vendorBlocks.screens[state.theme.currentScreen.id] : undefined;

const mapVendorBlocksToScreens = (vendorBlocks: VendorBlock[]) => {
  const screens: { [key: string]: { vendorBlocks: VendorBlock[]; isLoading: boolean } } = {};
  for (const block of vendorBlocks) {
    if (!block.screen) continue;

    if (!screens[block.screen.id]) {
      screens[block.screen.id] = { vendorBlocks: [], isLoading: false };
    }
    screens[block.screen.id].vendorBlocks.push({ ...block, isDraft: false });
  }
  return screens;
};
