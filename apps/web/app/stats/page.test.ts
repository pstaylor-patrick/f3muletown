import { redirect } from "next/navigation";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getStatsRedirectUrl } from "@f3muletown/redirects";

import StatsRedirect from "./page";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const mockedRedirect = vi.mocked(redirect);

describe("web stats redirect", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("redirects to the stats page for the current year", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-02T12:00:00Z"));

    const expectedUrl = getStatsRedirectUrl();

    StatsRedirect();

    expect(mockedRedirect).toHaveBeenCalledWith(expectedUrl);
  });
});
