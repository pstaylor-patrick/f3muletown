// CloudFront Function (cloudfront-js-2.0), viewer-request.
// Answers every request with a 307; the origin is never contacted.
// Keep these URLs in sync with packages/redirects/src/index.ts
// (packages/redirects/src/cloudfront-function.test.ts enforces it).
var REGION_URL = "https://regions.f3nation.com/muletown";
var STATS_URL = "https://pax-vault.f3nation.com/stats/region/35838";
var STATS_HOST = "stats.f3muletown.com";

function handler(event) {
  var request = event.request;
  var hostHeader = request.headers && request.headers.host;
  var host = hostHeader ? hostHeader.value.toLowerCase().split(":")[0] : "";
  var uri = request.uri || "/";
  var location = REGION_URL;

  if (host === STATS_HOST || uri === "/stats" || uri === "/stats/") {
    location = STATS_URL;
  }

  return {
    statusCode: 307,
    statusDescription: "Temporary Redirect",
    headers: {
      location: { value: location },
      "cache-control": { value: "no-store" },
    },
  };
}
