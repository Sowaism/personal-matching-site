const previews = [
  {
    href: "/tida_personal_top.html",
    title: "トップページ",
    description: "ランディングページ：ヒーロー、診断導線、トレーナー紹介、FAQ まで",
  },
  {
    href: "/tida_personal_quiz.html",
    title: "目標診断クイズ",
    description: "Kaorium 風グラデーション UI で目標に合うトレーナーを診断",
  },
  {
    href: "/tida_personal_trainers.html",
    title: "トレーナー一覧",
    description: "在籍プロトレーナーのカード一覧と絞り込み",
  },
  {
    href: "/tida_personal_trainer_detail.html",
    title: "トレーナー詳細",
    description: "プロフィール、実績、レビュー、予約導線",
  },
  {
    href: "/tida_personal_plans.html",
    title: "プラン一覧",
    description: "料金プランと特典の比較",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16 sm:px-10 sm:py-24">
        <header className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            TIDA Personal / Preview
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            デザインプレビュー一覧
          </h1>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            下記のリンクから、各ページのモックアップをご確認いただけます。デザイン・文言に関するフィードバックをお待ちしております。
          </p>
        </header>

        <ul className="flex flex-col gap-4">
          {previews.map((preview) => (
            <li key={preview.href}>
              <a
                href={preview.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-emerald-400 hover:bg-emerald-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30 sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-zinc-950 sm:text-xl dark:text-zinc-50">
                    {preview.title}
                  </h2>
                  <span
                    aria-hidden
                    className="text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500"
                  >
                    →
                  </span>
                </div>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {preview.description}
                </p>
                <code className="text-xs text-zinc-400 dark:text-zinc-500">
                  {preview.href}
                </code>
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-4 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          各ページは静的 HTML のモックアップです。リンク内ナビゲーションは未接続の状態があります。
        </footer>
      </main>
    </div>
  );
}
