'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Board, Card, Column } from '@/types';
import { initialBoard } from '@/lib/initialData';

interface BoardContextType {
  board: Board;
  addCard: (columnId: string, title: string, details: string) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, sourceColumnId: string, destinationColumnId: string, destinationIndex: number) => void;
  renameColumn: (columnId: string, newTitle: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<Board>(initialBoard);

  const addCard = (columnId: string, title: string, details: string) => {
    const newCardId = `card-${Date.now()}`;
    const newCard: Card = { id: newCardId, title, details };

    setBoard((prev) => ({
      ...prev,
      cards: { ...prev.cards, [newCardId]: newCard },
      columns: prev.columns.map((col) =>
        col.id === columnId
          ? { ...col, cardIds: [...col.cardIds, newCardId] }
          : col
      ),
    }));
  };

  const deleteCard = (cardId: string) => {
    setBoard((prev) => {
      const { [cardId]: removed, ...remainingCards } = prev.cards;
      return {
        cards: remainingCards,
        columns: prev.columns.map((col) => ({
          ...col,
          cardIds: col.cardIds.filter((id) => id !== cardId),
        })),
      };
    });
  };

  const moveCard = (
    cardId: string,
    sourceColumnId: string,
    destinationColumnId: string,
    destinationIndex: number
  ) => {
    setBoard((prev) => {
      const newColumns = prev.columns.map((col) => {
        if (col.id === sourceColumnId && col.id === destinationColumnId) {
          const newCardIds = [...col.cardIds];
          const sourceIndex = newCardIds.indexOf(cardId);
          newCardIds.splice(sourceIndex, 1);
          newCardIds.splice(destinationIndex, 0, cardId);
          return { ...col, cardIds: newCardIds };
        }
        if (col.id === sourceColumnId) {
          return { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) };
        }
        if (col.id === destinationColumnId) {
          const newCardIds = [...col.cardIds];
          newCardIds.splice(destinationIndex, 0, cardId);
          return { ...col, cardIds: newCardIds };
        }
        return col;
      });

      return { ...prev, columns: newColumns };
    });
  };

  const renameColumn = (columnId: string, newTitle: string) => {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      ),
    }));
  };

  return (
    <BoardContext.Provider value={{ board, addCard, deleteCard, moveCard, renameColumn }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within BoardProvider');
  }
  return context;
}
