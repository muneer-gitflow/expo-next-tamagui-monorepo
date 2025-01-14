import { Eye, Trash2 } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import DraggableComponent from "@/components/draggables";
import { useMemo, useCallback } from "react";
import { ValidComponentKeys } from "@/lib/store/types";
import RenderWrapper from "./draggables/render-wrapper";
import styles from "./simulator-item.module.css";
import type { DnDComponent } from "@/lib/store/reducers/dnd.slice";
import { setActiveComponent } from "@/lib/store/reducers/dnd.slice";

import type { AppDispatch, RootState } from "@/lib/store/store";

import { useDispatch, useSelector } from "react-redux";
export default function SimulatorItem({
  item,
  index,
}: {
  item: DnDComponent;
  index: number;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const currentBlock = useSelector(
    (state: RootState) => state.dnd.currentBlock,
  );

  const handleBlockClick = useCallback(() => {
    dispatch(setActiveComponent(item));
  }, [item, dispatch]);

  const isValidComponent = useMemo(() => {
    if (!item?.block_id) return false;
    return Object.values(ValidComponentKeys).includes(
      item.block_id as ValidComponentKeys,
    );
  }, [item?.block_id]);

  const isActive = currentBlock?.id === item?.id;

  if (!item?.block_id || !isValidComponent) {
    return <div>Invalid component</div>;
  }

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className={`${styles.itemWrapper} ${isActive ? styles.active : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleBlockClick}
        >
          <div className={styles.content}>
            <RenderWrapper title={item.block_id}>
              <DraggableComponent
                id={item.block_id}
                mode="render"
                isActive={isActive}
                block={item}
              />
            </RenderWrapper>
          </div>

          {isActive ? (
            <div className={styles.controls}>
              <button className={styles.controlButton} type="button">
                <Eye size={16} />
              </button>
              <button className={styles.controlButton} type="button">
                <Trash2 size={16} />
              </button>
            </div>
          ) : null}
        </div>
      )}
    </Draggable>
  );
}
