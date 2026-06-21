import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AddCardForm } from "./AddCardForm";

describe("AddCardForm", () => {
  it("submits title and details", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<AddCardForm onAdd={onAdd} />);

    await user.type(screen.getByTestId("add-card-title"), "New card");
    await user.type(screen.getByTestId("add-card-details"), "Some details");
    await user.click(screen.getByTestId("add-card-submit"));

    expect(onAdd).toHaveBeenCalledWith("New card", "Some details");
  });

  it("does not submit without a title", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<AddCardForm onAdd={onAdd} />);

    await user.type(screen.getByTestId("add-card-details"), "Details only");
    await user.click(screen.getByTestId("add-card-submit"));

    expect(onAdd).not.toHaveBeenCalled();
  });
});
