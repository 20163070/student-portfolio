import { test, expect } from "@playwright/test";
import fs from "node:fs";

const prefix = fs
  .readFileSync("out/index.html", "utf8")
  .includes("/student-portfolio/_next/")
  ? "/student-portfolio"
  : "";
const slug = "wisepencat-lab0-git-workflow";

test("verified lab links to its report while examples stay unverified", async ({
  page,
  request,
}) => {
  await page.goto(prefix + "/learning/#labs");
  const labs = page.locator("#labs");
  const card = labs.locator("article").filter({ hasText: "WisePenCat Lab 0" });
  await expect(card).toContainText("提交已核验");
  await expect(card).toContainText("PR 已提交，等待审核");
  await expect(
    labs.getByText("待确认示例 · 完成情况未核实", { exact: true }),
  ).toHaveCount(3);
  await card.getByRole("link", { name: "查看实验报告 →" }).click();
  await expect(page).toHaveURL(new RegExp(`/blog/${slug}/$`));
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "WisePenCat Lab 0",
  );
  await expect(page.getByRole("note")).toHaveCount(0);
  await expect(page.locator("pre .hljs").first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "PR #20", exact: true }),
  ).toHaveAttribute(
    "href",
    "https://github.com/zhao-jingyan/WisePenCat/pull/20",
  );
  for (const [name, hash] of [
    ["提交 bd05e14", "bd05e1405649deea4c7800ec92674413f06e6321"],
    ["提交 7f91b6e", "7f91b6e992cb20cf9975e7b2c799e918f33e5050"],
  ]) {
    await expect(page.getByRole("link", { name, exact: true })).toHaveAttribute(
      "href",
      `https://github.com/20163070/WisePenCat/commit/${hash}`,
    );
  }
  const toc = page.getByRole("navigation", { name: "文章目录" });
  await toc
    .getByRole("link", { name: "Git 的四个位置与状态变化", exact: true })
    .click();
  await expect(page).toHaveURL(/#git-/);
  await page
    .getByRole("link", { name: "Learning 实验档案", exact: true })
    .click();
  await expect(page).toHaveURL(/\/learning\/#labs$/);
  const sitemap = await request.get(prefix + "/sitemap.xml");
  expect(await sitemap.text()).toContain(`/blog/${slug}/`);
  await page.goto(prefix + "/tags/Git/");
  await expect(page.getByRole("link", { name: /从零完成一次/ })).toBeVisible();
  await page.goto(prefix + "/projects/");
  await expect(page.getByRole("link", { name: /WisePenCat/ })).toHaveCount(0);
});

test("lab report is searchable by every requested keyword and readable on mobile in both themes", async ({
  page,
}) => {
  await page.goto(prefix + "/search/");
  for (const keyword of [
    "Git",
    "GitHub",
    "Lab 0",
    "WisePenCat",
    "Version Control",
  ]) {
    await page.getByRole("searchbox").fill(keyword);
    await expect(
      page.getByRole("link", { name: /从零完成一次/ }),
    ).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const dark of [false, true]) {
    await page.addInitScript(
      (dark) => localStorage.setItem("theme", dark ? "dark" : "light"),
      dark,
    );
    for (const route of ["/learning/#labs", `/blog/${slug}/`]) {
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
    }
  }
});
