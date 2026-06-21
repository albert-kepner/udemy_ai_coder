import type { BoardAction, BoardState, Card } from "./board-types";
import { getCardsForColumn, rebuildCards } from "./board-utils";

function createId(): string {
  return crypto.randomUUID();
}

export function boardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    case "RENAME_COLUMN":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, title: action.title }
            : column,
        ),
      };

    case "ADD_CARD": {
      const newCard: Card = {
        id: createId(),
        columnId: action.columnId,
        title: action.title,
        details: action.details,
      };
      const columnCards = getCardsForColumn(state, action.columnId);
      const otherCards = state.cards.filter(
        (card) => card.columnId !== action.columnId,
      );
      return {
        ...state,
        cards: [...otherCards, ...columnCards, newCard],
      };
    }

    case "DELETE_CARD":
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.cardId),
      };

    case "MOVE_CARD": {
      const card = state.cards.find((item) => item.id === action.cardId);
      if (!card) {
        return state;
      }

      const cardsByColumn = Object.fromEntries(
        state.columns.map((column) => [
          column.id,
          getCardsForColumn(state, column.id).filter(
            (item) => item.id !== action.cardId,
          ),
        ]),
      ) as Record<string, Card[]>;

      const movedCard = { ...card, columnId: action.toColumnId };
      const targetCards = cardsByColumn[action.toColumnId] ?? [];
      const insertIndex = Math.max(
        0,
        Math.min(action.toIndex, targetCards.length),
      );
      targetCards.splice(insertIndex, 0, movedCard);
      cardsByColumn[action.toColumnId] = targetCards;

      return {
        ...state,
        cards: rebuildCards(state.columns, cardsByColumn),
      };
    }

    default:
      return state;
  }
}
