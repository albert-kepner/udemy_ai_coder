import type { BoardState, Card } from "./board-types";

export function getCardsForColumn(state: BoardState, columnId: string): Card[] {
  return state.cards.filter((card) => card.columnId === columnId);
}

export function getColumnCardIds(state: BoardState, columnId: string): string[] {
  return getCardsForColumn(state, columnId).map((card) => card.id);
}

export function rebuildCards(
  columns: BoardState["columns"],
  cardsByColumn: Record<string, Card[]>,
): Card[] {
  return columns.flatMap((column) => cardsByColumn[column.id] ?? []);
}
