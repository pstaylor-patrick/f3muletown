const REGION_BASE_URL = "https://regions.f3nation.com";
const DEFAULT_REGION_SLUG = "muletown";

const STATS_URL = "https://pax-vault.f3nation.com/stats/region/35838";

export const defaults = {
  regionSlug: DEFAULT_REGION_SLUG,
} as const;

export function getRegionRedirectUrl(slug: string = DEFAULT_REGION_SLUG) {
  return `${REGION_BASE_URL}/${slug}`;
}

export function getStatsRedirectUrl() {
  return STATS_URL;
}

export const redirects = {
  regionHome: getRegionRedirectUrl,
  stats: getStatsRedirectUrl,
} as const;
