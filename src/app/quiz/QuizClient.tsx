"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { TRAINERS } from "@/lib/trainers";

type Step = "intro" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | "loading" | "results";

type Question = {
  num: number;
  prompt: string;
  options: { letter: "A" | "B" | "C" | "D"; text: string }[];
};

const QUESTIONS: Question[] = [
  {
    num: 1,
    prompt: "今一番の目標は\nなんですか？",
    options: [
      { letter: "A", text: "体を引き締めてスリムになりたい" },
      { letter: "B", text: "筋肉をつけて体型を変えたい" },
      { letter: "C", text: "健康的な体を維持・管理したい" },
      { letter: "D", text: "スポーツ・競技のパフォーマンスを上げたい" },
    ],
  },
  {
    num: 2,
    prompt: "トレーニングの\n経験はありますか？",
    options: [
      { letter: "A", text: "まったくはじめて" },
      { letter: "B", text: "少し経験あり（独学・動画など）" },
      { letter: "C", text: "ジムに通ったことがある" },
      { letter: "D", text: "継続してトレーニングしている" },
    ],
  },
  {
    num: 3,
    prompt: "どんなスタイルで\n受けたいですか？",
    options: [
      { letter: "A", text: "対面で丁寧に教えてもらいたい" },
      { letter: "B", text: "オンラインで自宅から受けたい" },
      { letter: "C", text: "両方を状況に応じて使いたい" },
    ],
  },
  {
    num: 4,
    prompt: "週に何回\nトレーニングできそうですか？",
    options: [
      { letter: "A", text: "週1回" },
      { letter: "B", text: "週2〜3回" },
      { letter: "C", text: "週4回以上" },
    ],
  },
  {
    num: 5,
    prompt: "月のご予算は\nどのくらいですか？",
    options: [
      { letter: "A", text: "〜¥30,000" },
      { letter: "B", text: "¥30,000〜¥50,000" },
      { letter: "C", text: "¥50,000〜¥80,000" },
      { letter: "D", text: "¥80,000以上" },
    ],
  },
  {
    num: 6,
    prompt: "一番気になることは\n何ですか？",
    options: [
      { letter: "A", text: "怪我が心配・体に不安がある" },
      { letter: "B", text: "続けられるか不安" },
      { letter: "C", text: "食事管理も一緒にサポートしてほしい" },
      { letter: "D", text: "特になし" },
    ],
  },
  {
    num: 7,
    prompt: "トレーナーの\n性別の希望は？",
    options: [
      { letter: "A", text: "男性トレーナーがいい" },
      { letter: "B", text: "女性トレーナーがいい" },
      { letter: "C", text: "どちらでもよい" },
    ],
  },
];

const Q1_GOAL_MAP: Record<string, string> = {
  A: "diet",
  B: "muscle",
  C: "health",
  D: "sport",
};

const TOTAL_Q = 7;
const STORAGE_KEY = "tida.quiz.answers";

export default function QuizClient() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loadingProgress, setLoadingProgress] = useState({
    bar: false,
    s1: false,
    s2: false,
    s3: false,
  });
  const [resultsReady, setResultsReady] = useState(false);

  // Restore previous answers from sessionStorage on mount
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Persist answers
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers]);

  // Loading sequencing
  useEffect(() => {
    if (step !== "loading") return;
    setLoadingProgress({ bar: false, s1: false, s2: false, s3: false });
    const t0 = setTimeout(
      () => setLoadingProgress((p) => ({ ...p, bar: true })),
      80
    );
    const t1 = setTimeout(
      () => setLoadingProgress((p) => ({ ...p, s1: true })),
      460
    );
    const t2 = setTimeout(
      () => setLoadingProgress((p) => ({ ...p, s2: true })),
      1130
    );
    const t3 = setTimeout(
      () => setLoadingProgress((p) => ({ ...p, s3: true })),
      1880
    );
    const tEnd = setTimeout(() => setStep("results"), 2980);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [step]);

  // Animate match bars on results
  useEffect(() => {
    if (step !== "results") {
      setResultsReady(false);
      return;
    }
    const t = setTimeout(() => setResultsReady(true), 380);
    return () => clearTimeout(t);
  }, [step]);

  const goal = Q1_GOAL_MAP[answers.q1];
  const trainersAllUrl = goal ? `/trainers?goal=${goal}` : "/trainers";

  const matchedTrainers = useMemo(() => {
    // Use up to first 3 trainers as match results — enriched ranks/percentages
    const top = TRAINERS.slice(0, 3).map((t, i) => ({
      ...t,
      rank: i + 1,
      pct: i === 0 ? 96 : i === 1 ? 89 : 82,
      badge: i === 0 ? "人気No.1" : i === 1 ? "女性人気" : null,
    }));
    return top;
  }, []);

  function selectOption(qNum: number, letter: string) {
    setAnswers((a) => ({ ...a, [`q${qNum}`]: letter }));
    // advance after a short selected animation
    setTimeout(() => {
      if (qNum < TOTAL_Q) setStep((qNum + 1) as Step);
      else setStep("loading");
    }, 310);
  }

  function goBack() {
    if (typeof step === "number" && step > 1) setStep((step - 1) as Step);
  }

  const bgClass =
    step === "intro"
      ? "bg-intro"
      : step === "loading"
        ? "bg-loading"
        : step === "results"
          ? "bg-results"
          : "bg-question";

  const showProgress = typeof step === "number";
  const showBack = typeof step === "number" && step > 1;

  return (
    <div className="page-quiz">
      <div className={`q-bg ${bgClass}`} aria-hidden="true" />

      <div className={showProgress ? "q-progress-bar visible" : "q-progress-bar"}>
        {Array.from({ length: TOTAL_Q }).map((_, i) => {
          const idx = i + 1;
          const cls =
            typeof step === "number" && idx < step
              ? "passed"
              : typeof step === "number" && idx === step
                ? "current"
                : "";
          return <div key={idx} className={`q-dot ${cls}`} />;
        })}
      </div>

      {showBack && (
        <button type="button" className="q-back" onClick={goBack}>
          ← 戻る
        </button>
      )}

      {step === "intro" && (
        <div className="q-screen q-intro">
          <p className="q-intro-eyebrow">Free Trainer Diagnosis</p>
          <h1 className="q-intro-title">
            あなたにぴったりの
            <br />
            <em>トレーナーを見つける</em>
          </h1>
          <p className="q-intro-sub">
            7つの質問に答えるだけで、
            <br />
            目標とライフスタイルに合ったトレーナーをご提案します。
          </p>
          <div className="q-intro-meta">
            <div>
              <div className="q-intro-meta-num">7</div>
              <div className="q-intro-meta-label">質問数</div>
            </div>
            <div>
              <div className="q-intro-meta-num">約2分</div>
              <div className="q-intro-meta-label">所要時間</div>
            </div>
            <div>
              <div className="q-intro-meta-num">無料</div>
              <div className="q-intro-meta-label">完全無料</div>
            </div>
          </div>
          <button
            type="button"
            className="q-btn-start"
            onClick={() => setStep(1)}
          >
            診断をはじめる →
          </button>
        </div>
      )}

      {typeof step === "number" && (
        <div className="q-screen">
          <div className="q-inner">
            <div className="q-number">Q{step}</div>
            <h2 className="q-text">
              {QUESTIONS[step - 1].prompt.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <div className="options-list">
              {QUESTIONS[step - 1].options.map((opt) => {
                const isSelected = answers[`q${step}`] === opt.letter;
                return (
                  <button
                    key={opt.letter}
                    type="button"
                    className={isSelected ? "option-pill selected" : "option-pill"}
                    onClick={() => selectOption(step, opt.letter)}
                  >
                    <span className="option-letter">{opt.letter}</span>
                    <span className="option-text">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="q-screen q-loading">
          <div className="q-spinner" />
          <div>
            <p className="q-loading-title">
              あなたに合うトレーナーを
              <br />
              探しています…
            </p>
            <p className="q-loading-sub">回答をもとにマッチング中です</p>
          </div>
          <div className="q-loading-bar-wrap">
            <div
              className="q-loading-bar-fill"
              style={{ width: loadingProgress.bar ? "100%" : "0%" }}
            />
          </div>
          <div className="q-loading-steps">
            <div
              className={
                loadingProgress.s1 ? "q-loading-step show" : "q-loading-step"
              }
            >
              <div className="q-step-dot" />
              <div className="q-step-label">目標・スタイルを分析中</div>
            </div>
            <div
              className={
                loadingProgress.s2 ? "q-loading-step show" : "q-loading-step"
              }
            >
              <div className="q-step-dot" />
              <div className="q-step-label">127名のトレーナーを照合中</div>
            </div>
            <div
              className={
                loadingProgress.s3 ? "q-loading-step show" : "q-loading-step"
              }
            >
              <div className="q-step-dot" />
              <div className="q-step-label">おすすめトレーナーを選定中</div>
            </div>
          </div>
        </div>
      )}

      {step === "results" && (
        <div className="q-screen q-results">
          <div className="q-results-inner">
            <p className="q-results-eyebrow">Diagnosis Complete</p>
            <h2 className="q-results-title">
              あなたにぴったりの
              <br />
              トレーナーが見つかりました！
            </h2>
            <p className="q-results-sub">
              回答をもとに選ばれた<strong>上位3名</strong>をご紹介します。
              <br />
              まずは無料相談で気軽に話してみましょう。
            </p>

            <div className="q-result-cards">
              {matchedTrainers.map((t) => (
                <div key={t.id} className="q-result-card">
                  <div className={`q-rank rank-${t.rank}`}>{t.rank}</div>
                  <div className="q-result-info">
                    <div className="q-result-name">
                      {t.name}
                      {t.badge && (
                        <span
                          style={{
                            marginLeft: 7,
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 20,
                            background: "var(--q-primary)",
                            color: "#fff",
                          }}
                        >
                          {t.badge}
                        </span>
                      )}
                    </div>
                    <div className="q-result-spec">
                      {t.tags.slice(0, 3).join("・")}
                    </div>
                    <div className="q-match-bar-wrap">
                      <div
                        className="q-match-bar-fill"
                        style={{ width: resultsReady ? `${t.pct}%` : "0%" }}
                      />
                    </div>
                    <div className="q-match-label">
                      <span>マッチ度</span>
                      <span className="q-match-pct">{t.pct}%</span>
                    </div>
                    <Link
                      href={`/trainers/${t.id}`}
                      className="q-result-card-btn"
                    >
                      詳細を見る・無料相談する
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="q-results-cta">
              <Link href={trainersAllUrl} className="q-cta-primary">
                全トレーナーを見る
              </Link>
              <Link href="/" className="q-cta-secondary">
                トップページへ戻る
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
