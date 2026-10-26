import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getRegionRedirectUrl, getStatsRedirectUrl } from "./index";

type CfEvent = {
  request: { uri: string; headers: Record<string, { value: string }> };
};
type CfResponse = {
  statusCode: number;
  headers: Record<string, { value: string }>;
};

// The jsdom test environment gives import.meta.url an http scheme, so resolve from __dirname.
const source = readFileSync(
  resolve(__dirname, "../../../infra/redirect.js"),
  "utf8"
);
const handler = new Function(`${source}\nreturn handler;`)() as (
  event: CfEvent
) => CfResponse;

function run(host: string | undefined, uri: string) {
  const headers: CfEvent["request"]["headers"] = {};
  if (host !== undefined) headers.host = { value: host };
  return handler({ request: { uri, headers } });
}

const REGION = getRegionRedirectUrl();
const STATS = getStatsRedirectUrl();

describe("CloudFront redirect function", () => {
  it.each([
    ["f3muletown.com", "/", REGION],
    ["www.f3muletown.com", "/", REGION],
    ["f3muletown.com", "/anything/deep", REGION],
    ["www.f3muletown.com", "/anything", REGION],
    ["f3muletown.com", "/stats", STATS],
    ["www.f3muletown.com", "/stats/", STATS],
    ["f3muletown.com", "/stats/extra", REGION],
    ["f3muletown.com", "/STATS", REGION],
    ["stats.f3muletown.com", "/", STATS],
    ["stats.f3muletown.com", "/whatever", STATS],
    ["STATS.F3MULETOWN.COM:443", "/", STATS],
    [undefined, "/", REGION],
  ])("host %s path %s -> %s", (host, uri, expected) => {
    const res = run(host, uri);
    expect(res.statusCode).toBe(307);
    expect(res.headers.location.value).toBe(expected);
    expect(res.headers["cache-control"].value).toBe("no-store");
  });
});
