import { redirect } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CatchAll from "./[...slug]/page";
import Home from "./page";
import { redirectUrl } from "@/lib/redirect";

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

    expect(mockedRedirect).toHaveBeenCalledWith(redirectUrl);
  });

  it("redirects catch-all routes to the main region site", () => {
    CatchAll();

    expect(mockedRedirect).toHaveBeenCalledWith(redirectUrl);
  });
});
