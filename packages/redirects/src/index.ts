const REGION_BASE_URL = "https://regions.f3nation.com";
const DEFAULT_REGION_SLUG = "muletown";

const STATS_BASE_URL = "https://www.yourfullstack.com/apps/f3fw/ytd.php";
const DEFAULT_STATS_LOCATION = "f3muletown";

export type StatsRedirectOptions = {
  year?: number;
  location?: string;
};

export const defaults = {
  regionSlug: DEFAULT_REGION_SLUG,
  statsLocation: DEFAULT_STATS_LOCATION,
} as const;

export function getRegionRedirectUrl(slug: string = DEFAULT_REGION_SLUG) {
  return `${REGION_BASE_URL}/${slug}`;
}

export function getStatsRedirectUrl({
  year = new Date().getFullYear(),
  location = DEFAULT_STATS_LOCATION,
}: StatsRedirectOptions = {}) {
  return `${STATS_BASE_URL}?year=${year}&location=${location}`;
}

export const redirects = {
  regionHome: getRegionRedirectUrl,
  stats: (options?: StatsRedirectOptions) => getStatsRedirectUrl(options),
} as const;
