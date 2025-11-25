import { redirect } from "next/navigation";
import { getStatsRedirectUrl } from "@f3muletown/redirects";

export default function StatsRedirect() {
  redirect(getStatsRedirectUrl());
}
