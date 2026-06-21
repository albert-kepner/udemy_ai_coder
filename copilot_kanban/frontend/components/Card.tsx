'use client';

import { Card as CardType } from '@/types';
import { useBoard } from '@/lib/BoardContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardProps {
  card: CardType;
}

export default function Card({ card }: CardProps) {
  const { deleteCard } = useBoard();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-[#032147] mb-2">{card.title}</h3>
          <p className="text-sm text-[#888888] line-clamp-3">{card.details}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteCard(card.id);
          }}
          className="text-[#888888] hover:text-[#753991] transition-colors flex-shrink-0"
          aria-label="Delete card"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
