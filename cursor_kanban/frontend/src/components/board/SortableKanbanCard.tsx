"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "@/lib/board-types";
import { KanbanCard } from "./KanbanCard";

type SortableKanbanCardProps = {
  card: Card;
  onDelete: (cardId: string) => void;
};

export function SortableKanbanCard({ card, onDelete }: SortableKanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanCard card={card} onDelete={onDelete} />
    </div>
  );
}
