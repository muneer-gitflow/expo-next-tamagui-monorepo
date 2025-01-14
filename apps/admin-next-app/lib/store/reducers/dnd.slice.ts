import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UIBlock } from '../types';

export interface DnDComponent extends UIBlock {
  id: string;
  config: unknown;
  index: string;
  initialConfig?: unknown;
  vendorBlockId?: number;
}

interface DndState {
  droppedComponents: DnDComponent[];
  currentBlock: DnDComponent | null;
  currentScreen: string | null;
}

const initialState: DndState = {
  droppedComponents: [],
  currentBlock: null,
  currentScreen: null,
};

const dndSlice = createSlice({
  name: 'dnd',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<DnDComponent>) => {
      state.droppedComponents.push(action.payload);
      state.currentBlock = action.payload;

      if (action.payload.config) {
        state.currentBlock.config = action.payload.config;
      }

      if (action.payload.initialConfig) {
        state.currentBlock.initialConfig = action.payload.initialConfig;
      }
    },
    deleteComponent: (state, action: PayloadAction<DnDComponent>) => {
      state.droppedComponents = state.droppedComponents.filter((c) => c.id !== action.payload.id);
      state.currentBlock = null;
    },
    reorderComponents: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const result = Array.from(state.droppedComponents);
      const [removed] = result.splice(action.payload.startIndex, 1);
      result.splice(action.payload.endIndex, 0, removed);
      state.droppedComponents = result;
    },
    setActiveComponent: (state, action: PayloadAction<DnDComponent | null>) => {
      state.currentBlock = action.payload;
    },
    setCurrentScreen: (state, action: PayloadAction<string>) => {
      state.currentScreen = action.payload;
    },
    resetComponents: (state) => {
      state.droppedComponents = [];
    },
    setCurrentBlockConfig: (state, action: PayloadAction<{ config: unknown; vendorBlockId: number | null }>) => {
      if (state.currentBlock) {
        state.currentBlock.config = action.payload.config;
        state.currentBlock.vendorBlockId = action.payload.vendorBlockId ?? undefined;
      }

      // find the same block in the droppedComponents and update the config
      const index = state.droppedComponents.findIndex((c) => c.id === state.currentBlock?.id);
      if (index !== -1) {
        state.droppedComponents[index].config = action.payload.config;
        state.droppedComponents[index].vendorBlockId = action.payload.vendorBlockId ?? undefined;
      }
    },
    setInitialBlocks: (state, action: PayloadAction<DnDComponent[]>) => {
      state.droppedComponents = action.payload;
      state.currentBlock = action.payload[0];
    },
  },
});

export const {
  addComponent,
  deleteComponent,
  reorderComponents,
  setActiveComponent,
  setCurrentScreen,
  resetComponents,
  setCurrentBlockConfig,
  setInitialBlocks,
} = dndSlice.actions;

export default dndSlice.reducer;
