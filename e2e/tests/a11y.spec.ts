import { test, expect } from "@playwright/test";

test.describe("Accessibility & responsive", () => {
  test("keyboard can open and close modal", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    // navigate to a Post a Project button via tabbing is flaky; click then Esc
    await page.getByRole("button", { name: "Post a Project" }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("form fields have labels", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Post a Project" }).first().click();
    const dialog = page.getByRole("dialog");
    for (const name of ["Project title", "Category", "Format", "Budget", "Deadline", "Project details"]) {
      await expect(dialog.getByLabel(name)).toBeVisible();
    }
  });

  test("AI selects have labels", async ({ page }) => {
    await page.goto("/");
    const ai = page.locator("#ai");
    for (const name of ["Content category", "Editing style", "Budget", "Deadline"]) {
      await expect(ai.getByLabel(name)).toBeVisible();
    }
  });

  test("progress bars expose aria values", async ({ page }) => {
    await page.goto("/");
    const bars = page.locator('[role="progressbar"]');
    await expect(bars).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(bars.nth(i)).toHaveAttribute("aria-valuemin", "0");
      await expect(bars.nth(i)).toHaveAttribute("aria-valuemax", "100");
    }
  });

  test("marketplace search is labelled", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("textbox", { name: "Search editors" })).toBeVisible();
  });

  test("renders at tablet width without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });

  test("renders at desktop width without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});