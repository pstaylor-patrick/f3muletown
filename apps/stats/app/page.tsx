import { redirect } from "next/navigation";

export default function Home() {
  const year = new Date().getFullYear();
  const target = `https://www.yourfullstack.com/apps/f3fw/ytd.php?year=${year}&location=f3muletown`;

  redirect(target);
}
