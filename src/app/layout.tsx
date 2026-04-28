import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import PendingHandler from "@/components/PendingHandler";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sowaism.github.io"),
  title: {
    default: "TIDA Personal — 127人のプロから、あなたに合う1人を。",
    template: "%s | TIDA Personal",
  },
  description:
    "資格・専門・料金で絞り込んで選べる、パーソナルトレーナーのマッチングサイト。ダイエット・筋トレ・産後ケアまで、本当に合う1人が見つかります。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJp.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily:
            "var(--font-noto-sans-jp), 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'メイリオ', sans-serif",
        }}
      >
        {children}
        <PendingHandler />
      </body>
    </html>
  );
}
