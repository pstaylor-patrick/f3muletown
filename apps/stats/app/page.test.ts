import { redirect } from "next/navigation";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getStatsRedirectUrl } from "@f3muletown/redirects";

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

    const expectedUrl = getStatsRedirectUrl();

    Home();

    expect(mockedRedirect).toHaveBeenCalledWith(expectedUrl);
  });
});
