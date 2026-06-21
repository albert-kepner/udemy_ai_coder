"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Card, Column } from "@/lib/board-types";
import { AddCardForm } from "./AddCardForm";
import { EditableColumnTitle } from "./EditableColumnTitle";
import { SortableKanbanCard } from "./SortableKanbanCard";

type BoardColumnProps = {
  column: Column;
  cards: Card[];
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function BoardColumn({
  column,
  cards,
  onRename,
  onAddCard,
  onDeleteCard,
}: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const cardIds = cards.map((card) => card.id);

  return (
    <section
      data-testid={`column-${column.id}`}
      className={`flex w-72 shrink-0 flex-col rounded-xl border border-blue-primary/15 bg-blue-primary/5 shadow-sm ${
        isOver ? "ring-2 ring-accent-yellow/60" : ""
      }`}
    >
      <header className="border-t-4 border-accent-yellow px-4 py-3">
        <EditableColumnTitle
          title={column.title}
          onRename={(title) => onRename(column.id, title)}
        />
        <p className="mt-1 text-xs text-gray-text">
          {cards.length} {cards.length === 1 ? "card" : "cards"}
        </p>
      </header>

      <div
        ref={setNodeRef}
        className="flex min-h-48 flex-1 flex-col gap-3 px-3 pb-3"
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <SortableKanbanCard
              key={card.id}
              card={card}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>
        <AddCardForm
          onAdd={(title, details) => onAddCard(column.id, title, details)}
        />
      </div>
    </section>
  );
}
