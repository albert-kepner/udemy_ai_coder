import { render, screen } from '@testing-library/react';
import { BoardProvider } from '@/lib/BoardContext';
import Card from '@/components/Card';
import { Card as CardType } from '@/types';
import { DndContext } from '@dnd-kit/core';

const mockCard: CardType = {
  id: 'test-card-1',
  title: 'Test Card',
  details: 'Test card details',
};

function renderCardInContext(card: CardType) {
  return render(
    <BoardProvider>
      <DndContext>
        <Card card={card} />
      </DndContext>
    </BoardProvider>
  );
}

describe('Card Component', () => {
  it('renders card title and details', () => {
    renderCardInContext(mockCard);
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test card details')).toBeInTheDocument();
  });

  it('renders delete button', () => {
    renderCardInContext(mockCard);
    expect(screen.getByLabelText('Delete card')).toBeInTheDocument();
  });
});
