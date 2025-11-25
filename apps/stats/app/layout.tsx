import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "F3 Muletown Metrics | YTD Totals",
  description:
    "Track F3 Muletown year-to-date workout totals, attendance metrics, and stats.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
