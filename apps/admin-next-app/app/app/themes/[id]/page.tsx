"use client";
import { Box, InlineStack } from "@shopify/polaris";
import {
  DragDropContext,
  type DropResult,
  type OnDragEndResponder,
} from "@hello-pangea/dnd";
import { DROPPABLE_ID } from "@/lib/const";
import type { AppDispatch, RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import EditorLayout from "@/components/layouts/editor.layout";

import BlocksPicker from "@/components/ui/editor/blocks-picker";
import SidebarSetting from "@/components/ui/editor/sidebar-setting";
import EditorSimulator from "@/components/simulators/editor.simulator";
import {
  addComponent,
  reorderComponents,
} from "@/lib/store/reducers/dnd.slice";
import type { DnDComponent } from "@/lib/store/reducers/dnd.slice";
import { useFetchThemeByIdQuery } from "@/lib/api/cms-api";
import { useEffect } from "react";
import { setActiveTheme } from "@/lib/store/reducers/theme.slice";

export default function ThemeEditor({ params }: { params: { id: string } }) {
  const themeId = params.id;

  const { data: theme, error } = useFetchThemeByIdQuery(Number(themeId), {
    skip: !themeId,
  });

  const uiBlocks = useSelector((state: RootState) => state.uiBlocks.blocks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (theme) {
      dispatch(setActiveTheme(theme));
    }
  }, [theme, dispatch]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === DROPPABLE_ID.COMPONENTS_PICKER &&
      destination.droppableId === DROPPABLE_ID.MOBILE_SIMULATOR
    ) {
      const component = uiBlocks[source.index];
      const newComponent = {
        ...component,
        id: `${component.id}-${Date.now()}`,
      };

      dispatch(addComponent(newComponent as unknown as DnDComponent));
    } else if (
      source.droppableId === DROPPABLE_ID.MOBILE_SIMULATOR &&
      destination.droppableId === DROPPABLE_ID.MOBILE_SIMULATOR
    ) {
      dispatch(
        reorderComponents({
          startIndex: source.index,
          endIndex: destination.index,
        }),
      );
    }
  };
  return (
    <EditorLayout>
      <Box width="100%">
        <DragDropContext onDragEnd={onDragEnd as OnDragEndResponder<string>}>
          <InlineStack>
            <BlocksPicker />
            <EditorSimulator />
            <SidebarSetting />
          </InlineStack>
        </DragDropContext>
      </Box>
    </EditorLayout>
  );
}
