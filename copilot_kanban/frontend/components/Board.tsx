'use client';

import { useBoard } from '@/lib/BoardContext';
import Column from './Column';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import Card from './Card';

export default function Board() {
  const { board, moveCard } = useBoard();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCard(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = board.columns.find((col) =>
      col.cardIds.includes(cardId)
    );

    let destinationColumn = board.columns.find((col) => col.id === overId);

    if (!destinationColumn) {
      destinationColumn = board.columns.find((col) =>
        col.cardIds.includes(overId)
      );
    }

    if (!sourceColumn || !destinationColumn) return;

    if (sourceColumn.id === destinationColumn.id && cardId === overId) return;

    let destinationIndex = destinationColumn.cardIds.indexOf(overId);
    
    if (destinationIndex < 0) {
      destinationIndex = destinationColumn.cardIds.length;
    } else if (sourceColumn.id === destinationColumn.id) {
      const sourceIndex = sourceColumn.cardIds.indexOf(cardId);
      if (sourceIndex < destinationIndex) {
        destinationIndex--;
      }
    }

    moveCard(cardId, sourceColumn.id, destinationColumn.id, destinationIndex);
  };

  const draggedCard = activeCard ? board.cards[activeCard] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#032147] mb-2">Kanban Board</h1>
          <div className="h-1 bg-[#ecad0a] rounded-full w-32"></div>
        </header>

        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {board.columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </div>

          <DragOverlay>
            {draggedCard ? (
              <div className="rotate-3 opacity-90">
                <Card card={draggedCard} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
