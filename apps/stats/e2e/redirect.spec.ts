import { expect, test } from "@playwright/test";

const statsHost = "www.yourfullstack.com";
const statsPath = "/apps/f3fw/ytd.php";
const currentYear = new Date().getFullYear();

test("redirects homepage to the current-year stats view", async ({ page }) => {
  // Third-party assets on the target stats page can hang; only wait for the navigation to commit.
  await page.goto("/", { waitUntil: "commit" });

  await page.waitForURL(
    (url) =>
      url.host === statsHost &&
      url.pathname === statsPath &&
      url.searchParams.get("year") === String(currentYear) &&
      url.searchParams.get("location") === "f3muletown",
    { timeout: 15_000 }
  );

  const url = new URL(page.url());

  expect(url.protocol).toBe("https:");
  expect(url.host).toBe(statsHost);
  expect(url.pathname).toBe(statsPath);
  expect(url.searchParams.get("year")).toBe(String(currentYear));
  expect(url.searchParams.get("location")).toBe("f3muletown");
});
