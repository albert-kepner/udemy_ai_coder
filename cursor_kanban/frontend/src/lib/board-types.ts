export type Column = { id: string; title: string };

export type Card = {
  id: string;
  columnId: string;
  title: string;
  details: string;
};

export type BoardState = {
  columns: Column[];
  cards: Card[];
};

export type BoardAction =
  | { type: "RENAME_COLUMN"; columnId: string; title: string }
  | { type: "ADD_CARD"; columnId: string; title: string; details: string }
  | { type: "DELETE_CARD"; cardId: string }
  | { type: "MOVE_CARD"; cardId: string; toColumnId: string; toIndex: number };
