import { redirect } from "next/navigation";
import { afterEach, describe, expect, it, vi } from "vitest";

import Home from "./page";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const mockedRedirect = vi.mocked(redirect);

describe("stats redirect", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("redirects to the stats page for the current year", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-07-04T15:00:00Z"));

    Home();

    expect(mockedRedirect).toHaveBeenCalledWith(
      "https://www.yourfullstack.com/apps/f3fw/ytd.php?year=2024&location=f3muletown"
    );
  });
});
