import { Board } from '@/types';

export const initialBoard: Board = {
  columns: [
    { id: 'col-1', title: 'To Do', cardIds: ['card-1', 'card-2'] },
    { id: 'col-2', title: 'In Progress', cardIds: ['card-3'] },
    { id: 'col-3', title: 'Review', cardIds: ['card-4'] },
    { id: 'col-4', title: 'Testing', cardIds: [] },
    { id: 'col-5', title: 'Done', cardIds: ['card-5', 'card-6'] },
  ],
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Design homepage mockup',
      details: 'Create wireframes and high-fidelity designs for the new homepage layout',
    },
    'card-2': {
      id: 'card-2',
      title: 'Set up database schema',
      details: 'Define tables and relationships for the application database',
    },
    'card-3': {
      id: 'card-3',
      title: 'Implement user authentication',
      details: 'Add login, signup, and password reset functionality',
    },
    'card-4': {
      id: 'card-4',
      title: 'API integration',
      details: 'Connect frontend to backend REST API endpoints',
    },
    'card-5': {
      id: 'card-5',
      title: 'Project initialization',
      details: 'Set up Next.js project with TypeScript and Tailwind CSS',
    },
    'card-6': {
      id: 'card-6',
      title: 'Git repository setup',
      details: 'Initialize repository and configure branch protection rules',
    },
  },
};
