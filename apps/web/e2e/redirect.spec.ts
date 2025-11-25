import { expect, test } from "@playwright/test";

const targetHost = "regions.f3nation.com";
const targetPath = "/muletown";

test("redirects homepage to the regions site", async ({ page }) => {
  await page.goto("/");

  await page.waitForURL(
    (url) => url.host === targetHost && url.pathname.startsWith(targetPath),
    { timeout: 15_000 }
  );

  const url = new URL(page.url());

  expect(url.protocol).toBe("https:");
  expect(url.host).toBe(targetHost);
  expect(url.pathname).toMatch(/^\/muletown\/?$/);
});
