# Kanban Board

A simple and elegant Kanban board application built with Next.js.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run unit tests:

```bash
npm test
```

Run integration tests (requires Playwright browsers installed):

```bash
npm run test:e2e
```

## Features

- Single board with 5 customizable columns
- Drag and drop cards between columns
- Add new cards with title and details
- Delete cards
- Rename column titles
- Professional UI with custom color scheme
- No persistence - all changes are session-based

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- dnd-kit for drag and drop
- Jest and React Testing Library
- Playwright for E2E testing

