import { test, expect } from "@playwright/test";
import fs from "node:fs";

const prefix = fs
  .readFileSync("out/index.html", "utf8")
  .includes("/student-portfolio/_next/")
  ? "/student-portfolio"
  : "";
const report = "/blog/wisepen-lab1a-hello-frontend/";

test("WisePen category reaches the interactive lab, tags and search", async ({
  page,
  request,
}) => {
  await page.goto(prefix + "/learning/#wisepen");
  const category = page.getByRole("region", { name: "WisePen", exact: true });
  const card = category
    .locator("article")
    .filter({ hasText: "Lab 1A | Hello Frontend!" });
  await expect(card).toContainText("本地源码已核对");
  await expect(category.locator("article")).toHaveCount(2);
  await card.getByRole("link", { name: "查看实验报告 →" }).click();
  await expect(page).toHaveURL(new RegExp(report + "$"));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Lab 1A | Hello Frontend!",
  );
  await expect(page.getByRole("note")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "GitHub 公开源码", exact: true }),
  ).toHaveAttribute("href", "https://github.com/20163070/wisepen-lab1a");
  await expect(page.locator("pre .hljs").first()).toBeVisible();
  await page
    .getByRole("navigation", { name: "文章目录" })
    .getByRole("link", { name: "在线交互 Demo", exact: true })
    .click();
  await expect(page).toHaveURL(/#counter-demo$/);
  await expect(page.locator("#counter-demo")).toHaveText("在线交互 Demo");
  for (const link of await page
    .getByRole("navigation", { name: "文章目录" })
    .locator("a")
    .evaluateAll((links) =>
      links.map((link) => ({
        href: link.getAttribute("href")!,
        label: link.textContent!,
      })),
    )) {
    expect(
      await page.evaluate(
        ({ href, label }) =>
          document.getElementById(href.slice(1))?.textContent === label,
        link,
      ),
    ).toBeTruthy();
  }
  await page
    .getByRole("link", { name: "WisePen 分类笔记", exact: true })
    .click();
  await expect(page).toHaveURL(/\/tags\/WisePen\/$/);
  await expect(
    page.getByRole("link", { name: "Lab 1A | Hello Frontend!", exact: true }),
  ).toBeVisible();
  await page.goto(prefix + "/search/");
  for (const query of [
    "WisePen",
    "Lab 1A",
    "Hello Frontend",
    "React",
    "计数器",
    "useState",
  ]) {
    await page.getByRole("searchbox").fill(query);
    await expect(
      page.getByRole("link", { name: "Lab 1A | Hello Frontend!", exact: true }),
    ).toBeVisible();
  }
  expect(await (await request.get(prefix + "/sitemap.xml")).text()).toContain(
    report,
  );
});

test("counter responds exactly once to clicks, Enter and Space and resets on reload", async ({
  page,
}) => {
  await page.goto(prefix + report);
  const demo = page.getByRole("region", { name: "在线交互 Demo", exact: true });
  const count = demo.locator("output");
  const button = demo.getByRole("button");
  await expect(count).toHaveText("0");
  for (let value = 1; value <= 5; value++) {
    await button.click();
    await expect(count).toHaveText(String(value));
    await expect(button).toHaveText(`count is ${value}`);
  }
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(count).toHaveText("6");
  await page.keyboard.press("Space");
  await expect(count).toHaveText("7");
  await page.reload();
  await expect(count).toHaveText("0");
  await page.getByRole("link", { name: "← 返回 Blog", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(button).toBeFocused();
});

test("mobile and dark counter remain usable with no overflow or browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  for (const dark of [false, true]) {
    await page.addInitScript(
      (dark) => localStorage.setItem("theme", dark ? "dark" : "light"),
      dark,
    );
    for (const route of ["/learning/#wisepen", report, "/tags/WisePen/"]) {
      await page.goto(prefix + route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      expect(
        await page
          .locator("html")
          .evaluate((node) => node.classList.contains("dark")),
      ).toBe(dark);
      if (route === report) {
        await page
          .getByRole("button", { name: "count is 0", exact: true })
          .click();
        await expect(page.locator("output")).toHaveText("1");
      }
    }
  }
  expect(errors).toEqual([]);
});
