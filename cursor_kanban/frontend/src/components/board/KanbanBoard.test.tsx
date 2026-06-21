import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { KanbanBoard } from "./KanbanBoard";

describe("KanbanBoard", () => {
  it("renders five columns with dummy cards", () => {
    render(<KanbanBoard />);

    expect(screen.getByRole("heading", { name: "Project Board" })).toBeVisible();
    expect(screen.getByTestId("kanban-board").children).toHaveLength(5);
    expect(screen.getByText("Research competitors")).toBeVisible();
    expect(screen.getByText("Project scaffolding")).toBeVisible();
  });

  it("adds a card to a column", async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);

    const todoColumn = screen.getByTestId("column-col-todo");
    await user.type(within(todoColumn).getByTestId("add-card-title"), "Fresh task");
    await user.type(
      within(todoColumn).getByTestId("add-card-details"),
      "Fresh details",
    );
    await user.click(within(todoColumn).getByTestId("add-card-submit"));

    expect(screen.getByText("Fresh task")).toBeVisible();
    expect(screen.getByText("Fresh details")).toBeVisible();
  });

  it("deletes a card", async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);

    await user.click(screen.getByTestId("delete-card-card-3"));

    expect(screen.queryByText("Design board layout")).not.toBeInTheDocument();
  });

  it("renames a column", async () => {
    const user = userEvent.setup();
    render(<KanbanBoard />);

    const todoColumn = screen.getByTestId("column-col-todo");
    await user.click(within(todoColumn).getByTestId("column-title"));
    const input = within(todoColumn).getByTestId("column-title-input");
    await user.clear(input);
    await user.type(input, "Ready{Enter}");

    expect(within(todoColumn).getByTestId("column-title")).toHaveTextContent(
      "Ready",
    );
  });
});
