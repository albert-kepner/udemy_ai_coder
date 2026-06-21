import { describe, expect, it } from "vitest";
import { boardReducer } from "./board-reducer";
import { initialBoardState } from "./dummy-data";
import { getCardsForColumn } from "./board-utils";

describe("boardReducer", () => {
  it("renames a column", () => {
    const next = boardReducer(initialBoardState, {
      type: "RENAME_COLUMN",
      columnId: "col-todo",
      title: "Ready",
    });

    expect(
      next.columns.find((column) => column.id === "col-todo")?.title,
    ).toBe("Ready");
    expect(next.columns).toHaveLength(5);
  });

  it("adds a card to a column", () => {
    const next = boardReducer(initialBoardState, {
      type: "ADD_CARD",
      columnId: "col-todo",
      title: "New task",
      details: "Details here",
    });

    const todoCards = getCardsForColumn(next, "col-todo");
    expect(todoCards).toHaveLength(3);
    expect(todoCards.at(-1)?.title).toBe("New task");
    expect(todoCards.at(-1)?.details).toBe("Details here");
  });

  it("deletes a card by id", () => {
    const next = boardReducer(initialBoardState, {
      type: "DELETE_CARD",
      cardId: "card-3",
    });

    expect(next.cards.some((card) => card.id === "card-3")).toBe(false);
    expect(next.cards).toHaveLength(initialBoardState.cards.length - 1);
  });

  it("ignores deleting a missing card", () => {
    const next = boardReducer(initialBoardState, {
      type: "DELETE_CARD",
      cardId: "missing-card",
    });

    expect(next).toEqual(initialBoardState);
  });

  it("moves a card to another column", () => {
    const next = boardReducer(initialBoardState, {
      type: "MOVE_CARD",
      cardId: "card-3",
      toColumnId: "col-done",
      toIndex: 0,
    });

    const doneCards = getCardsForColumn(next, "col-done");
    expect(doneCards[0]?.id).toBe("card-3");
    expect(getCardsForColumn(next, "col-todo")).toHaveLength(1);
  });

  it("reorders a card within the same column", () => {
    const next = boardReducer(initialBoardState, {
      type: "MOVE_CARD",
      cardId: "card-4",
      toColumnId: "col-todo",
      toIndex: 0,
    });

    const todoCards = getCardsForColumn(next, "col-todo");
    expect(todoCards[0]?.id).toBe("card-4");
  });

  it("ignores moving a missing card", () => {
    const next = boardReducer(initialBoardState, {
      type: "MOVE_CARD",
      cardId: "missing-card",
      toColumnId: "col-done",
      toIndex: 0,
    });

    expect(next).toEqual(initialBoardState);
  });
});
