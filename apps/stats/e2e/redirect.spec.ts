import { expect, test } from "@playwright/test";

const statsHost = "pax-vault.f3nation.com";
const statsPath = "/stats/region/35838";

test("redirects homepage to the stats page", async ({ page }) => {
  // Third-party assets on the target stats page can hang; only wait for the navigation to commit.
  await page.goto("/", { waitUntil: "commit" });

  await page.waitForURL(
    (url) => url.host === statsHost && url.pathname === statsPath,
    { timeout: 15_000 }
  );

  const url = new URL(page.url());

  expect(url.protocol).toBe("https:");
  expect(url.host).toBe(statsHost);
  expect(url.pathname).toBe(statsPath);
});
