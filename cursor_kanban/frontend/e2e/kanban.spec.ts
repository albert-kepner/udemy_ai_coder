import { expect, test } from "@playwright/test";

test.describe("Kanban board", () => {
  test("loads with dummy data", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Project Board" })).toBeVisible();
    await expect(page.getByTestId("kanban-board").locator("> *")).toHaveCount(5);
    await expect(page.getByText("Research competitors")).toBeVisible();
    await expect(page.getByText("Project scaffolding")).toBeVisible();
  });

  test("adds a new card to a column", async ({ page }) => {
    await page.goto("/");

    const column = page.getByTestId("column-col-todo");
    await column.getByTestId("add-card-title").fill("Playwright card");
    await column.getByTestId("add-card-details").fill("Added via E2E test");
    await column.getByTestId("add-card-submit").click();

    await expect(page.getByText("Playwright card")).toBeVisible();
    await expect(page.getByText("Added via E2E test")).toBeVisible();
  });

  test("deletes a card", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("delete-card-card-3").click();

    await expect(page.getByText("Design board layout")).not.toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    await page.goto("/");

    const column = page.getByTestId("column-col-todo");
    await column.getByTestId("column-title").click();
    const input = column.getByTestId("column-title-input");
    await input.fill("Ready");
    await input.press("Enter");

    await expect(column.getByTestId("column-title")).toHaveText("Ready");
  });

  test("drags a card to another column", async ({ page }) => {
    await page.goto("/");

    const card = page.getByTestId("card-card-3");
    const targetColumn = page.getByTestId("column-col-done");

    const cardBox = await card.boundingBox();
    const targetBox = await targetColumn.boundingBox();

    if (!cardBox || !targetBox) {
      throw new Error("Could not resolve drag targets");
    }

    const startX = cardBox.x + cardBox.width / 2;
    const startY = cardBox.y + cardBox.height / 2;
    const endX = targetBox.x + targetBox.width / 2;
    const endY = targetBox.y + 120;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 15, startY + 15, { steps: 5 });
    await page.mouse.move(endX, endY, { steps: 25 });
    await page.mouse.up();

    await expect(targetColumn.getByText("Design board layout")).toBeVisible();
    await expect(
      page.getByTestId("column-col-todo").getByText("Design board layout"),
    ).not.toBeVisible();
  });
});
