import { test, expect } from "@playwright/test";
import { coursework } from "../src/data/coursework";
import { courseCatalog } from "../src/data/course-catalog";
import { validateCoursework } from "../src/lib/coursework-validation";
import {
  getCourse,
  getRelatedCoursework,
  groupCoursework,
  sortCoursework,
  toCourseworkListItem,
} from "../src/lib/coursework";
import { getSearchIndex } from "../src/lib/search";
import { matchesSearch } from "../src/lib/search-utils";
import fs from "node:fs";

const prefix = fs
  .readFileSync("out/index.html", "utf8")
  .includes("/student-portfolio/_next/")
  ? "/student-portfolio"
  : "";
const financeTitle = "公司金融 · Homework 1";
const mathTitle = "集合与图论 · 9.29 作业";

test("metadata validation catches broken maintenance input and handles unknown dates", () => {
  const sample = coursework[0];
  expect(validateCoursework(coursework, courseCatalog, () => true)).toEqual([]);
  expect(
    validateCoursework([sample, sample], courseCatalog, () => true).join(),
  ).toContain("Duplicate slug");
  expect(
    validateCoursework(
      [
        {
          ...sample,
          courseId: "missing",
          date: "2026-02-30",
          updatedAt: "9.29",
        },
      ],
      courseCatalog,
      () => false,
    ).join(),
  ).toMatch(/Unknown course ID/);
  const errors = validateCoursework(
    [
      {
        ...sample,
        date: "2026-02-30",
        documents: [{ ...sample.documents[0], url: "/files/../secret.pdf" }],
      },
    ],
    [{ id: "invalid", name: "" }],
    () => false,
  ).join();
  expect(errors).toContain("Invalid date");
  expect(errors).toContain("Invalid public asset path");
  expect(errors).toContain("Missing course name");
  expect(errors).toContain("Missing file");
  expect(
    validateCoursework(
      [{ ...sample, courseId: undefined, semester: undefined }],
      [],
      () => true,
    ),
  ).toEqual([]);
  expect(getCourse(undefined).name).toBe("课程待确认");
  expect(groupCoursework([])).toEqual([]);
  const another = { ...sample, slug: "another-homework" };
  expect(
    getRelatedCoursework([...coursework, another], sample).map(
      (item) => item.slug,
    ),
  ).toEqual(["another-homework"]);
  expect(
    getRelatedCoursework(coursework, { ...sample, courseId: undefined }),
  ).toEqual([]);
  const undated = toCourseworkListItem(sample);
  const older = { ...undated, slug: "older", date: "2025-03-01" };
  const newer = { ...undated, slug: "newer", date: "2026-03-01" };
  expect(
    sortCoursework([undated, older, newer], "updated").map((item) => item.slug),
  ).toEqual(["newer", "older", sample.slug]);
  expect(
    sortCoursework([undated, newer, older], "oldest").map((item) => item.slug),
  ).toEqual(["older", "newer", sample.slug]);
  const index = getSearchIndex();
  expect(new Set(index.map((item) => item.id)).size).toBe(index.length);
  expect(
    index
      .filter((item) => matchesSearch(item.searchText, "  ｉｒｒ  "))
      .map((item) => item.title),
  ).toContain(financeTitle);
  expect(
    index
      .filter((item) => matchesSearch(item.searchText, "course-guideline.pdf"))
      .map((item) => item.title),
  ).toContain(financeTitle);
});

test("folder archive combines search and course filters, persists URL and handles empty results", async ({
  page,
}) => {
  await page.goto(prefix + "/coursework/");
  await expect(page.getByRole("status")).toContainText("2");
  await expect(page.locator('[aria-label="作业档案统计"]')).toContainText(
    "5附件",
  );
  const search = page.getByRole("searchbox", {
    name: "搜索课程、作业与知识点",
  });
  for (const [query, title] of [
    [" IRR ", financeTitle],
    ["irr", financeTitle],
    ["鸽巢原理", mathTitle],
    ["Homework 1", financeTitle],
    ["Corporate Finance", financeTitle],
    ["questions.png", mathTitle],
  ]) {
    await search.fill(query);
    await expect(page.getByRole("status")).toContainText("1");
    await expect(
      page.getByRole("link", { name: title, exact: true }),
    ).toBeVisible();
  }
  await search.fill("IRR");
  const folders = page.getByRole("complementary", { name: "课程文件夹" });
  await folders.getByRole("button", { name: /集合与图论/ }).click();
  await expect(
    page.getByRole("heading", { name: "没有找到匹配的作业" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "清空搜索" }).click();
  await expect(
    page.getByRole("link", { name: mathTitle, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: financeTitle, exact: true }),
  ).toHaveCount(0);
  await folders.getByRole("button", { name: /公司金融/ }).click();
  await expect(page).toHaveURL(/course=corporate-finance/);
  await page.reload();
  await expect(
    folders.getByRole("button", { name: /公司金融/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await folders.getByRole("button", { name: /集合与图论/ }).click();
  await page.goBack();
  await expect(
    page.getByRole("link", { name: financeTitle, exact: true }),
  ).toBeVisible();
  await page.goForward();
  await expect(
    page.getByRole("link", { name: mathTitle, exact: true }),
  ).toBeVisible();
  await page.getByLabel("排序", { exact: true }).selectOption("course");
  await expect(page).toHaveURL(/sort=course/);
  await page.goto(prefix + "/coursework/?course=does-not-exist");
  await expect(
    page.getByRole("heading", { name: "没有找到匹配的作业" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "查看全部作业", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("2");
  const semester = folders.locator("details").first();
  await semester.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(semester).not.toHaveAttribute("open", "");
});

test("unified search covers all types and keeps query/type through reload and history", async ({
  page,
}) => {
  await page.goto(prefix + "/search/");
  const results = page.locator("article");
  await expect(results).toHaveCount(getSearchIndex().length);
  const types = page.getByRole("group", { name: "搜索内容类型" });
  await types.getByRole("button", { name: /^作业/ }).click();
  await expect(results).toHaveCount(2);
  const search = page.getByRole("searchbox");
  await search.fill("irr");
  await expect(results).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: financeTitle, exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(search).toHaveValue("irr");
  await expect(types.getByRole("button", { name: /^作业/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await search.fill("no-such-content");
  await expect(
    page.getByRole("heading", { name: "没有找到匹配的内容" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "清空搜索" }).click();
  await expect(results).toHaveCount(2);
  await types.getByRole("button", { name: /^项目/ }).click();
  await expect(
    page.getByRole("link", { name: "Developer Portfolio", exact: true }),
  ).toBeVisible();
  await types.getByRole("button", { name: /^文章/ }).click();
  await expect(results).toHaveCount(
    getSearchIndex().filter((item) => item.kind === "blog").length,
  );
  await search.fill("ICS");
  await expect(page.getByRole("link", { name: /Data Lab/ })).toBeVisible();
  await types.getByRole("button", { name: /^全部/ }).click();
  await page.goBack();
  await expect(types.getByRole("button", { name: /^文章/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(search).toHaveValue("ICS");
  await page.goForward();
  await expect(types.getByRole("button", { name: /^全部/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await search.fill("鸽巢原理");
  await expect(
    page.getByRole("link", { name: mathTitle, exact: true }),
  ).toBeVisible();
  await expect(page.locator("mark").first()).toContainText("鸽巢原理");
});

test("old detail routes preserve assets, breadcrumbs and lazy PDF preview with fallback", async ({
  page,
  request,
}) => {
  const pdfRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".pdf")) pdfRequests.push(request.url());
  });
  await page.goto(prefix + "/coursework/corporate-finance-homework-1/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    financeTitle,
  );
  expect(pdfRequests).toEqual([]);
  await expect(page.locator("object")).toHaveCount(0);
  await page
    .getByRole("button", { name: "预览 PDF：我的手写解答", exact: true })
    .click();
  await expect(page.locator("object")).toHaveAttribute(
    "data",
    prefix + "/files/corporate-finance-homework-1/solution-1.pdf",
  );
  await expect(
    page.getByRole("link", { name: "新窗口打开原文件", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "预览 PDF：Homework 1 作业题目", exact: true })
    .click();
  await expect(page.locator("object")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "预览 PDF：我的手写解答", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  await page
    .getByRole("button", { name: "收起预览：Homework 1 作业题目", exact: true })
    .click();
  await expect(page.locator("object")).toHaveCount(0);
  await page
    .getByRole("navigation", { name: "面包屑" })
    .getByRole("link", { name: "公司金融", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("1");
  await expect(page).toHaveURL(/course=corporate-finance/);
  await page.goto(prefix + "/coursework/sets-and-graph-theory-09-29/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(mathTitle);
  await expect(page.getByRole("navigation", { name: "面包屑" })).toContainText(
    "学期待确认",
  );
  await expect(
    page.getByRole("heading", { name: "同课程的其他作业" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "查看图片 ↗", exact: true }),
  ).toHaveCount(1);
  for (const url of await page
    .locator("#documents a[download]")
    .evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLAnchorElement).href),
    )) {
    expect((await request.get(url)).status()).toBe(200);
  }
});

test("mobile archive keeps folder selection and active navigation accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(prefix + "/coursework/");
  const select = page.getByLabel("选择学期与课程");
  await select.selectOption({ label: "公司金融（1）" });
  await expect(page.getByRole("status")).toContainText("1");
  await expect(
    page.getByRole("link", { name: financeTitle, exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(select).toHaveValue(/course=corporate-finance/);
  await page.getByRole("button", { name: "主导航菜单" }).click();
  await expect(
    page
      .getByRole("navigation", { name: "移动端主导航" })
      .getByRole("link", { name: "作业", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "主导航菜单" }),
  ).toHaveAttribute("aria-expanded", "false");
  for (const route of [
    "/coursework/",
    "/coursework/sets-and-graph-theory-09-29/",
    "/search/?q=IRR",
  ]) {
    await page.goto(prefix + route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  await page.goto(prefix + "/coursework/?course=corporate-finance");
  await expect(select).toHaveValue("semester=&course=corporate-finance");
  await expect(select.locator("option:checked")).toHaveText(
    "公司金融 · 全部学期",
  );
});
