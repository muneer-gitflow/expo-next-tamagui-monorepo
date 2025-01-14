import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UIBlock, UIBlocksState } from '../types';
import { current } from 'immer';
import Fuse from 'fuse.js';

export const setUIBlocks = createAsyncThunk('uiBlocks/setUIBlocks', async (blocks: UIBlock[]) => {
  return blocks;
});

// Initial state
const initialState: UIBlocksState = {
  blocks: [],
  displayBlocks: [],
  loading: false,
  error: null,
  searchTerm: '',
  currentBlock: {
    block: null,
    config: null,
  },
};

// UI Blocks slice
const uiBlocksSlice = createSlice({
  name: 'uiBlocks',
  initialState,
  reducers: {
    resetUIBlocks: (state) => {
      state.blocks = [];
      state.displayBlocks = [];
      state.currentBlock = { block: null, config: null };
      state.loading = false;
      state.error = null;
    },
    setCurrentBlock: (state, action: PayloadAction<{ block: UIBlock }>) => {
      state.currentBlock.block = action.payload.block;
    },
    updateCurrentBlock: (state, action: PayloadAction<{ data: any }>) => {
      state.currentBlock = {
        block: action.payload.data.ui_block,
        config: action.payload.data.config,
      };
    },
    resetCurrentBlock: (state) => {
      state.currentBlock = { block: null, config: null };
    },
    updateCurrentBlockConfig: (state, action: PayloadAction<Record<string, any>>) => {
      if (state.currentBlock.config) {
        state.currentBlock.config.fieldValues = {
          ...state.currentBlock.config.fieldValues,
          ...action.payload,
        };
      }
    },
    searchBlocks: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      if (action.payload === '') {
        state.displayBlocks = state.blocks;
        return;
      }

      if (action.payload?.length < 3) {
        state.displayBlocks = state.blocks;
        return;
      }

      const blocks = current(state.blocks);

      // Configure Fuse.js options for minimal tolerance (strict matching)
      const options = {
        keys: ['display_name'],
        threshold: 0.3, // Adjusted threshold
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      };

      const fuse = new Fuse(blocks, options);
      const results = fuse.search(action.payload);

      state.displayBlocks = results.map((result) => result.item);
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.displayBlocks = state.blocks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUIBlocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUIBlocks.fulfilled, (state, action: PayloadAction<UIBlock[]>) => {
        state.loading = false;
        state.blocks = action.payload;
        state.displayBlocks = action.payload;
      })
      .addCase(setUIBlocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch UI blocks';
      });
  },
});

export const {
  resetUIBlocks,
  setCurrentBlock,
  resetCurrentBlock,
  updateCurrentBlockConfig,
  searchBlocks,
  clearSearch,
  updateCurrentBlock,
} = uiBlocksSlice.actions;

export default uiBlocksSlice.reducer;
