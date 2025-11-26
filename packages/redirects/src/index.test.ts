import { afterEach, describe, expect, it, vi } from "vitest";

import {
  defaults,
  getRegionRedirectUrl,
  getStatsRedirectUrl,
  redirects,
} from "./index";

describe("@f3muletown/redirects", () => {
  describe("getRegionRedirectUrl", () => {
    it("returns the default region redirect", () => {
      expect(getRegionRedirectUrl()).toBe(
        "https://regions.f3nation.com/muletown"
      );
    });

    it("allows overriding the region slug", () => {
      expect(getRegionRedirectUrl("nashville")).toBe(
        "https://regions.f3nation.com/nashville"
      );
    });
  });

  describe("getStatsRedirectUrl", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("uses the current year and default location when not provided", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-02-15T10:00:00Z"));

      expect(getStatsRedirectUrl()).toBe(
        "https://www.yourfullstack.com/apps/f3fw/ytd.php?year=2026&location=f3muletown"
      );
    });

    it("accepts custom years and locations", () => {
      expect(
        getStatsRedirectUrl({ year: 2023, location: defaults.statsLocation })
      ).toBe(
        "https://www.yourfullstack.com/apps/f3fw/ytd.php?year=2023&location=f3muletown"
      );

      expect(getStatsRedirectUrl({ year: 2025, location: "f3wherever" })).toBe(
        "https://www.yourfullstack.com/apps/f3fw/ytd.php?year=2025&location=f3wherever"
      );
    });
  });

  describe("redirects helper", () => {
    it("provides a region home shortcut", () => {
      expect(redirects.regionHome()).toBe(
        "https://regions.f3nation.com/muletown"
      );

      expect(redirects.regionHome("nashville")).toBe(
        "https://regions.f3nation.com/nashville"
      );
    });

    it("provides a stats shortcut", () => {
      expect(redirects.stats({ year: 2030, location: "f3alpha" })).toBe(
        "https://www.yourfullstack.com/apps/f3fw/ytd.php?year=2030&location=f3alpha"
      );
    });
  });
});
