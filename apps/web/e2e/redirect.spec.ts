import { expect, test } from "@playwright/test";

const targetHost = "regions.f3nation.com";
const targetPath = "/muletown";

const statsHost = "www.yourfullstack.com";
const statsPath = "/apps/f3fw/ytd.php";
const statsLocation = "f3muletown";

test("redirects homepage to the regions site", async ({ page }) => {
  // Some third-party assets on the target site never finish loading; wait for the navigation to commit only.
  await page.goto("/", { waitUntil: "commit" });

  await page.waitForURL(
    (url) => url.host === targetHost && url.pathname.startsWith(targetPath),
    { timeout: 15_000 }
  );

  const url = new URL(page.url());

  expect(url.protocol).toBe("https:");
  expect(url.host).toBe(targetHost);
  expect(url.pathname).toMatch(/^\/muletown\/?$/);
});

test("redirects /stats to the current-year stats view", async ({ page }) => {
  const currentYear = new Date().getFullYear();

  await page.goto("/stats", { waitUntil: "commit" });

  await page.waitForURL(
    (url) =>
      url.host === statsHost &&
      url.pathname === statsPath &&
      url.searchParams.get("year") === String(currentYear) &&
      url.searchParams.get("location") === statsLocation,
    { timeout: 15_000 }
  );

  const url = new URL(page.url());

  expect(url.protocol).toBe("https:");
  expect(url.host).toBe(statsHost);
  expect(url.pathname).toBe(statsPath);
  expect(url.searchParams.get("year")).toBe(String(currentYear));
  expect(url.searchParams.get("location")).toBe(statsLocation);
});
