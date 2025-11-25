import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getRegionRedirectUrl } from "@f3muletown/redirects";

import CatchAll from "./[...slug]/page";
import Home from "./page";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const mockedRedirect = vi.mocked(redirect);

describe("web redirects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects the root route to the main region site", () => {
    Home();

    expect(mockedRedirect).toHaveBeenCalledWith(getRegionRedirectUrl());
  });

  it("redirects catch-all routes to the main region site", () => {
    CatchAll();

    expect(mockedRedirect).toHaveBeenCalledWith(getRegionRedirectUrl());
  });
});
