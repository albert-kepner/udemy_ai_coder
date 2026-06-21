# Kanban Board Implementation

A complete MVP implementation of a Kanban-style project management web application.

## Quick Start

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
copilot_kanban/
├── frontend/          # Next.js application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components (Board, Column, Card)
│   ├── lib/          # State management and utilities
│   ├── types/        # TypeScript type definitions
│   ├── __tests__/    # Unit tests
│   └── e2e/          # End-to-end tests
├── AGENTS.md         # AI coding agent instructions
└── PLAN.md          # Implementation plan
```

## Features

- Single board with 5 customizable columns
- Drag and drop cards between columns
- Add new cards with title and details
- Delete cards
- Rename column titles
- Professional UI with custom color scheme
- No persistence - session-based changes only

## Testing

Run unit tests:

```bash
cd frontend
npm test
```

Run E2E tests:

```bash
cd frontend
npm run test:e2e
```

## Tech Stack

- Next.js 16 (client-rendered)
- TypeScript
- Tailwind CSS
- dnd-kit for drag and drop
- React Context for state management
- Jest and React Testing Library for unit tests
- Playwright for integration tests

## Implementation Notes

This project was built following the specifications in AGENTS.md:
- Simple, elegant UI/UX with no over-engineering
- Custom color scheme as specified
- Comprehensive testing coverage
- No persistence or user management
- Focus on simplicity and polish
