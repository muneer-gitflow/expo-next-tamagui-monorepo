import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  DroppableResult,
  SimulatorItem,
  VendorSimulatorState,
} from "@/lib/store/types";
import type { RootState } from "@/lib/store/store";
import { DROPPABLE_ID } from "@/lib/const";
import { resetCurrentBlock } from "./ui-blocks.slice";

// Define initial state with screens
const initialState: VendorSimulatorState = {
  themeId: "",
  vendorId: "",
  screens: {},
};

export const addItemToSimulator = createAsyncThunk(
  "vendorSimulator/addItemToSimulator",
  async (
    action: PayloadAction<{ result: DroppableResult; screenId: string }>,
    { getState, rejectWithValue },
  ) => {
    const state = getState() as RootState;
    const { result, screenId } = action.payload;

    // Allow multiple items of the same type using a unique simulatorItemId
    const currentScreenItems = state.simulator.screens[screenId] || [];

    if (
      currentScreenItems?.find((item) => item.block_id === result?.draggableId)
    ) {
      // Item already in simulator for this screen
      return rejectWithValue("Item already in simulator for this screen");
    }

    if (result.destination.droppableId === DROPPABLE_ID.MOBILE_SIMULATOR) {
      // Find the item in the components picker
      const item = state.uiBlocks.blocks.find(
        (item) => item.block_id === result.draggableId,
      );

      if (!item) {
        return rejectWithValue("Item not found in components picker");
      }

      const newItems = [
        ...currentScreenItems,
        {
          ...item,
          displayOrder: currentScreenItems.length,
          simulatorItemId: `${item.id}-${screenId}-${DROPPABLE_ID.MOBILE_SIMULATOR}`,
        },
      ];

      return { screenId, items: newItems };
    }

    return { screenId, items: currentScreenItems };
  },
);

export const removeItem = createAsyncThunk(
  "vendorSimulator/removeItem",
  async (
    payload: { vendorBlockId?: string; screenId: string },
    { dispatch },
  ) => {
    if (payload.vendorBlockId) {
      try {
        // Delete from CMS if vendorBlockId exists
        const response = await fetch(`/app/api/vendor-blocks`, {
          method: "DELETE",
          body: JSON.stringify({ vendorBlockId: payload.vendorBlockId }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete vendor block");
        }
        dispatch(resetCurrentBlock());
      } catch (error) {
        console.error("Error deleting vendor block:", error);
        throw error;
      }
    }

    return payload;
  },
);

const vendorSimulatorSlice = createSlice({
  name: "vendorSimulator",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addItemToSimulator.fulfilled, (state, action) => {
      const { screenId, items } = action.payload;
      state.screens[screenId] = items as SimulatorItem[];
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      const items = state.screens[action.payload.screenId];
      if (items) {
        state.screens[action.payload.screenId] = items.filter(
          (item) => item.simulatorItemId !== action.payload.simulatorItemId,
        );
      }
    });
  },
  reducers: {
    setThemeAndVendor: (
      state,
      action: PayloadAction<{ themeId: string; vendorId: string }>,
    ) => {
      state.themeId = action.payload.themeId;
      state.vendorId = action.payload.vendorId;
    },
    updateItemConfig: (
      state,
      action: PayloadAction<{
        screenId: string;
        blockId: string;
        config: Record<string, any>;
      }>,
    ) => {
      const items = state.screens[action.payload.screenId];
      if (items) {
        const item = items.find(
          (item) => item.block_id === action.payload.blockId,
        );
        if (item) {
          item.config = action.payload.config;
        }
      }
    },
    updateItemDisplayOrder: (
      state,
      action: PayloadAction<{
        screenId: string;
        blockId: string;
        displayOrder: number;
      }>,
    ) => {
      const items = state.screens[action.payload.screenId];
      if (items) {
        const item = items.find(
          (item) => item.block_id === action.payload.blockId,
        );
        if (item) {
          item.displayOrder = action.payload.displayOrder;
        }
      }
    },
    setSimulatorItems: (
      state,
      action: PayloadAction<{ screenId: string; items: SimulatorItem[] }>,
    ) => {
      state.screens[action.payload.screenId] = action.payload.items;
    },
    resetSimulator: (state, action: PayloadAction<{ screenId: string }>) => {
      state.screens[action.payload.screenId] = [];
    },
    resetAllScreens: (state) => {
      state.screens = {};
    },
    removeItemFromSimulator: (
      state,
      action: PayloadAction<{
        simulatorItemId: string;
        currentScreenId: string | number;
      }>,
    ) => {
      const items = state.screens[action.payload.currentScreenId];
      if (items) {
        state.screens[action.payload.currentScreenId] = items.filter(
          (item) => item.simulatorItemId !== action.payload.simulatorItemId,
        );
      }
    },
  },
});

export const {
  setThemeAndVendor,
  updateItemConfig,
  updateItemDisplayOrder,
  setSimulatorItems,
  resetSimulator,
  resetAllScreens,
  removeItemFromSimulator,
} = vendorSimulatorSlice.actions;

export default vendorSimulatorSlice.reducer;

export const getSimulatorItems = (state: RootState) =>
  state.theme.currentScreen?.id
    ? state.simulator.screens[state.theme.currentScreen.id]
    : undefined;
