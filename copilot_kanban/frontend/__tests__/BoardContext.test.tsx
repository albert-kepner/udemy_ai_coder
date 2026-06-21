import { renderHook, act } from '@testing-library/react';
import { BoardProvider, useBoard } from '@/lib/BoardContext';
import { ReactNode } from 'react';

function wrapper({ children }: { children: ReactNode }) {
  return <BoardProvider>{children}</BoardProvider>;
}

describe('BoardContext', () => {
  it('initializes with default data', () => {
    const { result } = renderHook(() => useBoard(), { wrapper });
    expect(result.current.board.columns).toHaveLength(5);
    expect(Object.keys(result.current.board.cards).length).toBeGreaterThan(0);
  });

  it('adds a new card', () => {
    const { result } = renderHook(() => useBoard(), { wrapper });
    const initialCardCount = Object.keys(result.current.board.cards).length;

    act(() => {
      result.current.addCard('col-1', 'New Card', 'New card details');
    });

    expect(Object.keys(result.current.board.cards).length).toBe(initialCardCount + 1);
  });

  it('deletes a card', () => {
    const { result } = renderHook(() => useBoard(), { wrapper });
    const cardId = Object.keys(result.current.board.cards)[0];

    act(() => {
      result.current.deleteCard(cardId);
    });

    expect(result.current.board.cards[cardId]).toBeUndefined();
  });

  it('renames a column', () => {
    const { result } = renderHook(() => useBoard(), { wrapper });
    const columnId = result.current.board.columns[0].id;

    act(() => {
      result.current.renameColumn(columnId, 'New Title');
    });

    const column = result.current.board.columns.find(col => col.id === columnId);
    expect(column?.title).toBe('New Title');
  });

  it('moves card between different columns', () => {
    const { result } = renderHook(() => useBoard(), { wrapper });
    const sourceCol = result.current.board.columns[0];
    const destCol = result.current.board.columns[1];
    const cardToMove = sourceCol.cardIds[0];

    act(() => {
      result.current.moveCard(cardToMove, sourceCol.id, destCol.id, 0);
    });

    const updatedSourceCol = result.current.board.columns.find(col => col.id === sourceCol.id);
    const updatedDestCol = result.current.board.columns.find(col => col.id === destCol.id);

    expect(updatedSourceCol?.cardIds).not.toContain(cardToMove);
    expect(updatedDestCol?.cardIds).toContain(cardToMove);
    expect(updatedDestCol?.cardIds[0]).toBe(cardToMove);
  });

  it('reorders card within same column', () => {
    const { result } = renderHook(() => useBoard(), { wrapper });
    const column = result.current.board.columns[0];
    const cardIds = [...column.cardIds];

    if (cardIds.length < 2) {
      act(() => {
        result.current.addCard(column.id, 'Test Card 1', 'Details 1');
        result.current.addCard(column.id, 'Test Card 2', 'Details 2');
      });
    }

    const updatedColumn = result.current.board.columns.find(col => col.id === column.id);
    const updatedCardIds = updatedColumn?.cardIds || [];
    const firstCard = updatedCardIds[0];
    const cardCount = updatedCardIds.length;

    act(() => {
      result.current.moveCard(firstCard, column.id, column.id, cardCount - 1);
    });

    const finalColumn = result.current.board.columns.find(col => col.id === column.id);
    
    expect(finalColumn?.cardIds).toHaveLength(cardCount);
    expect(finalColumn?.cardIds[cardCount - 1]).toBe(firstCard);
    expect(finalColumn?.cardIds).not.toContain(undefined);
  });
});
