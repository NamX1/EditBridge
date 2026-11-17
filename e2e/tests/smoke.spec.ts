import { test, expect } from "@playwright/test";

test.describe("EditBridge landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero and stats", async ({ page }) => {
    await test.step("hero heading visible", async () => {
      await expect(page.getByRole("heading", { name: /Find an editor who/i })).toBeVisible();
    });
    await test.step("stats render", async () => {
      await expect(page.getByText("Creative editor profiles")).toBeVisible();
      await expect(page.getByText("Portfolio categories")).toBeVisible();
    });
  });

  test("mobile nav toggles", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await test.step("open mobile menu", async () => {
      await page.getByRole("button", { name: "Toggle menu" }).click();
      await expect(page.locator(".nav-mobile")).toBeVisible();
    });
    await test.step("navigate and close", async () => {
      await page.getByRole("link", { name: "Find Editors" }).first().click();
      await expect(page.locator(".nav-mobile")).not.toBeVisible();
    });
  });

  test("marketplace filters and empty state", async ({ page }) => {
    await test.step("search with no match shows empty state", async () => {
      await page.getByRole("textbox", { name: "Search editors" }).fill("zzzz");
      await expect(page.getByRole("heading", { name: "No editors match these filters" })).toBeVisible();
    });
    await test.step("clear filters restores list", async () => {
      await page.getByRole("button", { name: "Clear filters" }).click();
      await expect(page.locator(".editor-card")).toHaveCount(3);
    });
  });

  test("category filter narrows results", async ({ page }) => {
    await test.step("filter by beauty", async () => {
      await page.getByRole("combobox", { name: "Filter by category" }).selectOption("beauty");
      await expect(page.locator(".editor-card")).toHaveCount(1);
    });
    await test.step("clear restores all", async () => {
      await page.getByRole("button", { name: "Clear" }).click();
      await expect(page.locator(".editor-card")).toHaveCount(3);
    });
  });

  test("budget and turnaround filters", async ({ page }) => {
    await page.getByRole("combobox", { name: "Filter by budget" }).selectOption("low");
    await expect(page.locator(".editor-card")).toHaveCount(1);
    await page.getByRole("combobox", { name: "Filter by budget" }).selectOption("");
    await page.getByRole("combobox", { name: "Filter by turnaround" }).selectOption("fast");
    await expect(page.locator(".editor-card")).toHaveCount(1);
  });

  test("shortlist toggles and toasts", async ({ page }) => {
    const card = page.locator(".editor-card").first();
    await card.getByRole("button", { name: "Save to Shortlist" }).click();
    await expect(card.getByRole("button", { name: "Saved" })).toBeVisible();
    await expect(page.getByRole("status")).toContainText("saved to shortlist");
    await card.getByRole("button", { name: "Saved" }).click();
    await expect(card.getByRole("button", { name: "Save to Shortlist" })).toBeVisible();
  });

  test("AI smart match produces a result", async ({ page }) => {
    await page.getByRole("button", { name: /Find My Match/i }).click();
    const result = page.locator(".result").first();
    await expect(result).toBeVisible();
    await expect(result).toContainText("Best Match");
    await expect(result).toContainText("%");
  });

  test("AI brief generator validates empty input", async ({ page }) => {
    await page.getByRole("button", { name: "Generate Brief" }).click();
    await expect(page.locator("#ai-brief")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#ai-brief-err")).toContainText("Type a project idea first");
  });

  test("AI brief generator produces a brief", async ({ page }) => {
    await page.getByLabel("AI Brief Generator").fill("skincare reel");
    await page.getByRole("button", { name: "Generate Brief" }).click();
    const result = page.locator(".result").last();
    await expect(result).toContainText("Generated Project Brief");
    await expect(result).toContainText("skincare reel");
  });

  test("post project modal validates and submits", async ({ page }) => {
    await page.getByRole("button", { name: "Post a Project" }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const submit = page.getByRole("button", { name: "Submit Project Request" });
    await expect(submit).toBeDisabled();
    await page.getByLabel("Project title").fill("Test project");
    await page.getByLabel("Project title").blur();
    await page.getByRole("dialog").getByLabel("Budget").selectOption("mid");
    await page.getByLabel("Project details").fill("A detailed project description here");
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page.getByRole("status")).toContainText("Project request sent");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("modal closes on Escape and restores focus", async ({ page }) => {
    const trigger = page.getByRole("button", { name: "Post a Project" }).first();
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test("login shows not-developed modal", async ({ page }) => {
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("Login is not developed yet.")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});