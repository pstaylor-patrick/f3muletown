import { describe, expect, it } from "vitest";

import { getRegionRedirectUrl, getStatsRedirectUrl, redirects } from "./index";

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
    it("returns the stats redirect URL", () => {
      expect(getStatsRedirectUrl()).toBe(
        "https://pax-vault.f3nation.com/stats/region/35838"
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
      expect(redirects.stats()).toBe(
        "https://pax-vault.f3nation.com/stats/region/35838"
      );
    });
  });
});
