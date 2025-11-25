import { redirect } from "next/navigation";
import { redirectUrl } from "@/lib/redirect";

export default function Home() {
  redirect(redirectUrl);
}
