import { expect, test } from "@playwright/test";
import fs from "node:fs";

const prefix = fs
  .readFileSync("out/index.html", "utf8")
  .includes("/student-portfolio/_next/")
  ? "/student-portfolio"
  : "";
const demoUrl = "https://silk-road-agent-awwmpa4xozpwr2pkcpz6rn.streamlit.app/";

test("Silk Road Agent is featured with correct external and internal actions", async ({
  page,
}) => {
  await page.goto(prefix + "/");
  const card = page
    .locator(".project-card")
    .filter({ has: page.getByRole("heading", { name: "Silk Road Agent" }) });
  await expect(card).toHaveCount(1);
  await expect(
    card.getByText("丝路跨境直播智能助理", { exact: true }),
  ).toBeVisible();
  const demo = card.getByRole("link", { name: "在线体验 ↗" });
  await expect(demo).toHaveAttribute("href", demoUrl);
  await expect(demo).toHaveAttribute("target", "_blank");
  await expect(demo).toHaveAttribute("rel", "noopener noreferrer");
  await card.getByRole("link", { name: "查看项目 →" }).click();
  await expect(page).toHaveURL(/\/projects\/silk-road-agent\/$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "跨越语言，让好物被理解。" }),
  ).toBeVisible();
});

test("details state the capability limits and have no inaccessible source link", async ({
  page,
  request,
}) => {
  await page.goto(prefix + "/projects/silk-road-agent/");
  await expect(
    page.getByRole("heading", { name: "证明做到了什么，也说明还没做到什么" }),
  ).toBeVisible();
  await expect(
    page.getByText("个人贡献待补充", { exact: false }).first(),
  ).toBeVisible();
  await expect(
    page.getByText("市场评分模块待完善", { exact: false }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /源代码/ })).toHaveCount(0);
  await expect(page.locator("iframe")).toHaveCount(0);
  const links = page.getByRole("link", { name: /在线体验|交互 Demo/ });
  expect(await links.count()).toBeGreaterThan(1);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", demoUrl);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  const cover = page.getByRole("img", { name: /真实运行首页|工作流示意/ });
  await expect(cover).toBeVisible();
  expect((await request.get((await cover.getAttribute("src"))!)).status()).toBe(
    200,
  );
});

test("mobile details and project listing fit screen width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/projects/", "/projects/silk-road-agent/"]) {
    await page.goto(prefix + path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path,
    ).toBeTruthy();
  }
  await page.getByRole("button", { name: "主导航菜单" }).click();
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(
    page.getByRole("heading", { name: "Silk Road Agent" }),
  ).toBeVisible();
});
import AxeBuilder from "@axe-core/playwright";

for (const width of [390, 768, 1366, 1920]) {
  for (const theme of ["light", "dark"]) {
    test(`Agent layout and accessibility ${width}px ${theme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.addInitScript(
        (value) => localStorage.setItem("theme", value),
        theme,
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      for (const route of ["/", "/projects/", "/projects/silk-road-agent/"]) {
        await page.goto(prefix + route);
        await expect(page.locator("html")).toHaveClass(
          theme === "dark" ? /dark/ : /^(?!.*dark).*$/,
        );
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          route,
        ).toBeTruthy();
        expect(
          (
            await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
              .analyze()
          ).violations,
        ).toEqual([]);
      }
      await page.screenshot({
        path: `test-results/agent-${width}-${theme}.png`,
        fullPage: true,
      });
      expect(
        await page
          .locator("html")
          .evaluate((node) => getComputedStyle(node).scrollBehavior),
      ).toBe("auto");
      const links = page.locator(`a[href="${demoUrl}"]`);
      for (const link of await links.all()) {
        expect(
          await link.evaluate((node) => (node as HTMLAnchorElement).tabIndex),
        ).toBeGreaterThanOrEqual(0);
        await link.focus();
        await expect(link).toBeFocused();
      }
      const image = page.getByRole("img", { name: /真实运行首页|工作流示意/ });
      expect(
        await image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
      ).toBeGreaterThan(0);
    });
  }
}

test("Agent is searchable and exported with SEO metadata", async ({
  page,
  request,
}) => {
  await page.goto(prefix + "/search/?q=Silk%20Road%20Agent&type=project");
  await page.getByRole("link", { name: /Silk Road Agent/ }).click();
  await expect(page).toHaveURL(/\/projects\/silk-road-agent\/$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://20163070.github.io/student-portfolio/projects/silk-road-agent/",
  );
  expect(await (await request.get(prefix + "/sitemap.xml")).text()).toContain(
    "/projects/silk-road-agent/",
  );
});

test("contribution evidence distinguishes task ownership and snapshot limitations", async ({ page }) => {
  await page.goto(prefix + "/projects/silk-road-agent/");
  const section = page.locator("#contribution-evidence");
  await expect(section.getByRole("heading", { name: "技术 C：主播端展示面板 + 评论分类" })).toBeVisible();
  await expect(section.locator("article")).toHaveCount(7);
  await expect(section.getByText("我想买这个", { exact: true })).toBeVisible();
  await expect(section.getByText("其他 · medium · confidence: low", { exact: true })).toBeVisible();
  await expect(section.getByText("[English] 火星量子香蕉", { exact: true })).toBeVisible();
  await expect(section).toContainText("无法确认 develop Commit 或代码作者");
  await expect(section).toContainText("我的选做贡献仍待确认");
});
