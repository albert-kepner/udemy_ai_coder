"use client";

import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useReducer, useRef, useState } from "react";
import { boardReducer } from "@/lib/board-reducer";
import { initialBoardState } from "@/lib/dummy-data";
import type { BoardState, Card } from "@/lib/board-types";
import { getCardsForColumn, getColumnCardIds } from "@/lib/board-utils";
import { BoardColumn } from "./BoardColumn";
import { KanbanCard } from "./KanbanCard";

function findColumnIdForCard(
  state: BoardState,
  cardId: string,
): string | undefined {
  return state.cards.find((item) => item.id === cardId)?.columnId;
}

function resolveColumnId(state: BoardState, id: string): string | undefined {
  if (state.columns.some((column) => column.id === id)) {
    return id;
  }
  return findColumnIdForCard(state, id);
}

export function KanbanBoard() {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const card = stateRef.current.cards.find(
      (item) => item.id === event.active.id,
    );
    setActiveCard(card ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const current = stateRef.current;
    const activeId = String(active.id);
    const overId = String(over.id);

    const activeColumnId = findColumnIdForCard(current, activeId);
    const overColumnId = resolveColumnId(current, overId);

    if (!activeColumnId || !overColumnId || activeColumnId === overColumnId) {
      return;
    }

    const overCards = getColumnCardIds(current, overColumnId);
    const overIndex = overCards.indexOf(overId);
    const toIndex = overIndex >= 0 ? overIndex : overCards.length;

    dispatch({
      type: "MOVE_CARD",
      cardId: activeId,
      toColumnId: overColumnId,
      toIndex,
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) {
      return;
    }

    const current = stateRef.current;
    const activeId = String(active.id);
    const overId = String(over.id);

    const activeColumnId = findColumnIdForCard(current, activeId);
    const overColumnId = resolveColumnId(current, overId);

    if (!activeColumnId || !overColumnId) {
      return;
    }

    const overCards = getColumnCardIds(current, overColumnId);
    const activeIndex = getColumnCardIds(current, activeColumnId).indexOf(
      activeId,
    );
    const overIndex = overCards.indexOf(overId);
    const toIndex = overIndex >= 0 ? overIndex : overCards.length;

    if (activeColumnId === overColumnId && activeIndex === toIndex) {
      return;
    }

    dispatch({
      type: "MOVE_CARD",
      cardId: activeId,
      toColumnId: overColumnId,
      toIndex,
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-accent-yellow/40 bg-white px-6 py-5 shadow-sm">
        <h1 className="text-2xl font-bold text-dark-navy">Project Board</h1>
        <p className="mt-1 text-sm text-gray-text">
          Drag cards between columns to track progress.
        </p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <main className="flex-1 overflow-x-auto px-6 py-6">
          <div className="flex gap-4" data-testid="kanban-board">
            {state.columns.map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
                cards={getCardsForColumn(state, column.id)}
                onRename={(columnId, title) =>
                  dispatch({ type: "RENAME_COLUMN", columnId, title })
                }
                onAddCard={(columnId, title, details) =>
                  dispatch({ type: "ADD_CARD", columnId, title, details })
                }
                onDeleteCard={(cardId) =>
                  dispatch({ type: "DELETE_CARD", cardId })
                }
              />
            ))}
          </div>
        </main>

        <DragOverlay>
          {activeCard ? (
            <div className="rotate-2 opacity-95">
              <KanbanCard card={activeCard} onDelete={() => undefined} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
