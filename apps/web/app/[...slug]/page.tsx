import { redirect } from "next/navigation";
import { getRegionRedirectUrl } from "@f3muletown/redirects";

export default function CatchAll() {
  redirect(getRegionRedirectUrl());
}
