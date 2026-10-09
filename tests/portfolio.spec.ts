import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import fs from "node:fs";
import path from "node:path";

test("Markdown renders inline and block mathematics with accessible MathML", async ({
  page,
}) => {
  const html = renderToStaticMarkup(
    createElement(
      ReactMarkdown,
      {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
      "Inline: $x^2 + y^2$.\n\n$$\n\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\n$$",
    ),
  );
  await page.setContent(html);
  await expect(page.locator(".katex")).toHaveCount(2);
  await expect(page.locator(".katex-display")).toHaveCount(1);
  await expect(page.locator("math")).toHaveCount(2);
  await expect(page.locator(".katex-error")).toHaveCount(0);
});
const prefix = fs
  .readFileSync("out/index.html", "utf8")
  .includes("/student-portfolio/_next/")
  ? "/student-portfolio"
  : "";
test("coursework is separate from homepage projects and has its own documents", async ({
  page,
  request,
}) => {
  for (const route of ["/", "/projects/"]) {
    await page.goto(prefix + route);
    await expect(
      page.getByRole("link", { name: "公司金融 · Homework 1", exact: true }),
    ).toHaveCount(0);
  }
  await page.goto(prefix + "/coursework/");
  await page
    .getByRole("link", { name: "公司金融 · Homework 1", exact: true })
    .click();
  await expect(page).toHaveURL(/\/coursework\/corporate-finance-homework-1\/$/);
  await expect(page.getByRole("link", { name: "← 全部作业" })).toHaveAttribute(
    "href",
    prefix + "/coursework/",
  );
  const files = await page
    .locator("#documents a[download]")
    .evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLAnchorElement).href),
    );
  expect(files).toHaveLength(3);
  for (const url of files) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "主导航菜单" }).click();
  await page.getByRole("link", { name: "作业", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "课程作业", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
test("exported pages, links, images and article anchors resolve under the deployment path", async ({
  page,
  request,
}) => {
  const pages: string[] = [];
  function walk(dir: string) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name);
      if (item.isDirectory()) walk(file);
      else if (item.name === "index.html") pages.push(file);
    }
  }
  walk("out");
  const links = new Set<string>();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const file of pages) {
    const route =
      prefix +
      "/" +
      path
        .relative("out", path.dirname(file))
        .split(path.sep)
        .filter(Boolean)
        .join("/") +
      "/";
    const response = await page.goto(route.replace(/\/\/+/g, "/"));
    expect(response?.status(), route).toBe(200);
    const targets = await page
      .locator('a[href], img[src], link[rel="stylesheet"]')
      .evaluateAll((nodes) =>
        nodes.map(
          (node) => node.getAttribute("href") || node.getAttribute("src") || "",
        ),
      );
    for (const target of targets) {
      if (target.startsWith("#")) {
        if (target.length > 1)
          expect(
            await page.evaluate(
              (id) => !!document.getElementById(decodeURIComponent(id)),
              target.slice(1),
            ),
            route + target,
          ).toBeTruthy();
      } else if (target.startsWith("/")) {
        expect(target.startsWith(prefix + "/"), target).toBeTruthy();
        links.add(target.split("#")[0]);
      }
    }
  }
  for (const link of links)
    expect((await request.get(link)).status(), link).toBe(200);
  expect(errors).toEqual([]);
});
test("mobile navigation, theme persistence, search and unfinished article state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(prefix + "/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "用代码构建",
  );
  await expect(
    page.locator(
      "#projects > .section-kicker, #engineering > .section-kicker, #blog > .section-kicker",
    ),
  ).toHaveText([
    "Featured Projects",
    "Engineering & Open Source",
    "Technical Writing",
  ]);
  await page.getByRole("button", { name: "主导航菜单" }).click();
  await expect(
    page.getByRole("button", { name: "主导航菜单" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "切换至深色模式" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "主导航菜单" }).click();
  await page.getByRole("link", { name: "Search", exact: true }).click();
  await page.getByRole("searchbox").fill("no-such-article-unique");
  await expect(page.getByRole("status")).toContainText("0");
  await page.getByRole("searchbox").fill("Bomb");
  await page.getByRole("link", { name: /Bomb/ }).click();
  await expect(page.getByRole("note")).toContainText("未完成笔记");
  for (const route of [
    "/",
    "/projects/",
    "/projects/student-portfolio/",
    "/blog/bomb-lab-tutorial/",
    "/learning/",
  ]) {
    await page.goto(prefix + route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBeTruthy();
  }
});

test("key pages meet automated WCAG A/AA checks in both themes", async ({
  page,
}) => {
  for (const dark of [false, true]) {
    await page.addInitScript(
      (dark) => localStorage.setItem("theme", dark ? "dark" : "light"),
      dark,
    );
    for (const route of [
      "/",
      "/coursework/",
      "/coursework/corporate-finance-homework-1/",
      "/projects/student-portfolio/",
      "/about/",
      "/blog/ics-data-lab-guide/",
      "/learning/",
      "/blog/bomb-lab-tutorial/",
      "/search/",
      "/archive/",
      "/tags/",
    ]) {
      await page.goto(prefix + route);
      await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
      const scan = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(scan.violations, route + " dark=" + dark).toEqual([]);
    }
  }
});
