import type { BoardState } from "./board-types";

export const initialBoardState: BoardState = {
  columns: [
    { id: "col-backlog", title: "Backlog" },
    { id: "col-todo", title: "To Do" },
    { id: "col-in-progress", title: "In Progress" },
    { id: "col-review", title: "Review" },
    { id: "col-done", title: "Done" },
  ],
  cards: [
    {
      id: "card-1",
      columnId: "col-backlog",
      title: "Research competitors",
      details: "Review top 5 Kanban apps and note standout UX patterns.",
    },
    {
      id: "card-2",
      columnId: "col-backlog",
      title: "Define color tokens",
      details: "Document accent yellow, blue primary, and purple secondary usage.",
    },
    {
      id: "card-3",
      columnId: "col-todo",
      title: "Design board layout",
      details: "Sketch five-column layout with consistent card spacing.",
    },
    {
      id: "card-4",
      columnId: "col-todo",
      title: "Set up drag and drop",
      details: "Integrate @dnd-kit for cross-column card moves.",
    },
    {
      id: "card-5",
      columnId: "col-in-progress",
      title: "Build card component",
      details: "Title, details, and delete action with hover states.",
    },
    {
      id: "card-6",
      columnId: "col-in-progress",
      title: "Inline column rename",
      details: "Click column header to edit title in place.",
    },
    {
      id: "card-7",
      columnId: "col-review",
      title: "Accessibility pass",
      details: "Verify keyboard navigation and focus rings on interactive elements.",
    },
    {
      id: "card-8",
      columnId: "col-review",
      title: "Responsive check",
      details: "Ensure horizontal scroll works on smaller viewports.",
    },
    {
      id: "card-9",
      columnId: "col-done",
      title: "Project scaffolding",
      details: "Next.js app, Vitest, and Playwright configured in frontend/.",
    },
    {
      id: "card-10",
      columnId: "col-done",
      title: "Dummy data seeded",
      details: "Board opens with sample cards across all columns.",
    },
  ],
};
