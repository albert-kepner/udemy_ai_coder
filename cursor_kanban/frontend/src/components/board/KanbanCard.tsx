"use client";

import type { Card } from "@/lib/board-types";

type KanbanCardProps = {
  card: Card;
  onDelete: (cardId: string) => void;
};

export function KanbanCard({ card, onDelete }: KanbanCardProps) {
  return (
    <article
      data-testid={`card-${card.id}`}
      className="rounded-lg border border-blue-primary/15 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-dark-navy">{card.title}</h3>
        <button
          type="button"
          aria-label={`Delete ${card.title}`}
          data-testid={`delete-card-${card.id}`}
          onClick={() => onDelete(card.id)}
          className="shrink-0 text-xs text-gray-text transition-colors hover:text-purple-secondary"
        >
          Delete
        </button>
      </div>
      <p className="text-sm leading-relaxed text-gray-text">{card.details}</p>
    </article>
  );
}
