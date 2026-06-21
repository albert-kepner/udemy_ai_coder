'use client';

import { useState } from 'react';
import { Column as ColumnType } from '@/types';
import { useBoard } from '@/lib/BoardContext';
import Card from './Card';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ColumnProps {
  column: ColumnType;
}

export default function Column({ column }: ColumnProps) {
  const { board, addCard, renameColumn } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDetails, setNewCardDetails] = useState('');

  const { setNodeRef } = useDroppable({ id: column.id });

  const handleRename = () => {
    if (title.trim()) {
      renameColumn(column.id, title.trim());
    }
    setIsEditing(false);
  };

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(column.id, newCardTitle.trim(), newCardDetails.trim());
      setNewCardTitle('');
      setNewCardDetails('');
      setIsAddingCard(false);
    }
  };

  const cards = column.cardIds.map((cardId) => board.cards[cardId]).filter(Boolean);

  return (
    <div className="bg-gray-50 rounded-lg p-4 w-80 flex-shrink-0 flex flex-col h-full">
      <div className="mb-4">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            className="text-lg font-bold text-[#032147] bg-white border border-[#209dd7] rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#209dd7]"
            autoFocus
          />
        ) : (
          <h2
            onClick={() => setIsEditing(true)}
            className="text-lg font-bold text-[#032147] cursor-pointer hover:text-[#209dd7] transition-colors"
          >
            {column.title}
          </h2>
        )}
        <div className="mt-1 h-1 bg-[#ecad0a] rounded-full w-12"></div>
      </div>

      <div ref={setNodeRef} className="flex-1 overflow-y-auto min-h-[200px]">
        <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </SortableContext>
      </div>

      {isAddingCard ? (
        <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <input
            type="text"
            placeholder="Card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="w-full mb-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#209dd7] text-sm"
            autoFocus
          />
          <textarea
            placeholder="Details"
            value={newCardDetails}
            onChange={(e) => setNewCardDetails(e.target.value)}
            className="w-full mb-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#209dd7] text-sm resize-none"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddCard}
              className="flex-1 bg-[#753991] text-white px-3 py-1 rounded hover:bg-[#8e4aaa] transition-colors text-sm font-medium"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingCard(false);
                setNewCardTitle('');
                setNewCardDetails('');
              }}
              className="flex-1 bg-gray-200 text-[#888888] px-3 py-1 rounded hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="mt-4 w-full bg-white border-2 border-dashed border-[#209dd7] text-[#209dd7] px-3 py-2 rounded hover:bg-[#209dd7] hover:text-white transition-colors text-sm font-medium"
        >
          + Add Card
        </button>
      )}
    </div>
  );
}
