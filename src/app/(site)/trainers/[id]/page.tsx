import Link from "next/link";
import { notFound } from "next/navigation";
import "./page.css";
import { TRAINERS, getTrainerById } from "@/lib/trainers";
import { PLANS } from "@/lib/plans";
import AnchorNav from "./AnchorNav";
import AboutToggle from "./AboutToggle";

export function generateStaticParams() {
  return TRAINERS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trainer = getTrainerById(id);
  return {
    title: trainer ? `${trainer.name}` : "トレーナー",
  };
}

const ABOUT_LONG_TEXT = `科学的根拠に基づいたトレーニング指導を10年以上続けてきました。実業団のスポーツ選手から、運動経験ゼロのデスクワーカーまで、これまで延べ200名以上の方をサポート。
一人ひとりの生活リズム・既往歴・モチベーションを丁寧にヒアリングして、無理なく続けられるオーダーメイドのプランを設計します。
オンライン指導でもフォーム確認・食事フィードバック・週次レビューを徹底し、対面と遜色ないクオリティを保つことを大切にしています。
「どこから始めていいか分からない」「自分に合うやり方が知りたい」――そんな方ほど結果が出やすいので、ぜひ一度ご相談ください。`;

const CANDO_ITEMS = [
  "目標体重・体脂肪率まで、無理のないペースで管理",
  "オンラインでのフォーム指導・食事写真フィードバック",
  "ジムに行けない日の自宅トレーニングメニューの提案",
  "毎週のミニ目標設定で、続ける仕組みを一緒に作る",
];

export default async function TrainerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trainer = getTrainerById(id);
  if (!trainer) notFound();

  const trainerPlans = PLANS.filter((p) => p.trainerId === trainer.id);

  return (
    <div className="page-trainer-detail">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">ホーム</Link>
          <span>›</span>
          <Link href="/trainers">トレーナーを探す</Link>
          <span>›</span>
          <span>{trainer.name}</span>
        </div>

        <div className="detail-layout">
          <main>
            <section id="sec-profile" className="trainer-header">
              <div className="trainer-hero">
                <div
                  className="trainer-big-avatar"
                  style={{ background: "linear-gradient(135deg,#2dd4bf,#0d9488)" }}
                >
                  {trainer.avatarChar}
                </div>
                <div className="trainer-hero-info">
                  <h1>{trainer.name}</h1>
                  <p className="tagline">{trainer.subtitle}</p>
                  <div className="hero-badges">
                    {trainer.badges.includes("popular") && (
                      <span className="badge badge-popular">人気No.1</span>
                    )}
                    {trainer.badges.includes("verified") && (
                      <span className="badge badge-verified">本人確認済</span>
                    )}
                    {trainer.certLabel && (
                      <span className="badge badge-cert">{trainer.certLabel}</span>
                    )}
                  </div>
                  <div className="stats-row">
                    <div className="stat-box">
                      <div className="stat-big">{trainer.contracts}</div>
                      <div className="stat-small">累計指導</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-big">{trainer.rating}</div>
                      <div className="stat-small">平均評価（{trainer.reviewCount}件）</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-big">
                        ¥{trainer.monthlyPrice.toLocaleString()}〜
                      </div>
                      <div className="stat-small">月額</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="trainer-tags">
                {trainer.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </section>

            <AnchorNav />

            <section id="sec-about" className="section-card">
              <h2>できること・プランの特徴</h2>
              <AboutToggle text={ABOUT_LONG_TEXT} />
              <div className="cando-list" style={{ marginTop: 20 }}>
                {CANDO_ITEMS.map((c) => (
                  <div key={c} className="cando-item">
                    <span className="material-icons cando-check">check_circle</span>
                    <div className="cando-text">{c}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="sec-courses" className="section-card">
              <h2>コースメニュー</h2>
              {trainerPlans.length > 0 ? (
                trainerPlans.map((p, idx) => (
                  <div
                    key={p.id}
                    className={idx === 0 ? "course-card recommended" : "course-card"}
                  >
                    <div className="course-header">
                      <div>
                        <div className="course-name">{p.title}</div>
                        {idx === 0 && <span className="course-rec-tag">おすすめ</span>}
                      </div>
                      <div className="course-price-big">
                        ¥{p.price.toLocaleString()}
                        <span>{p.priceUnit}</span>
                      </div>
                    </div>
                    <div className="course-features">
                      {p.features.map((f) => (
                        <span key={f} className="cf">
                          <span className="material-icons">check_circle</span>
                          {f}
                        </span>
                      ))}
                    </div>
                    <p className="course-desc">{p.description}</p>
                    <div className="course-cta">
                      <button
                        type="button"
                        className="btn-course-primary"
                        data-pending="true"
                      >
                        このコースで申し込む
                      </button>
                      <button
                        type="button"
                        className="btn-course-secondary"
                        data-pending="true"
                      >
                        まずは相談してみる
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--c-muted)" }}>
                  このトレーナーのコースは現在準備中です。
                </p>
              )}
            </section>

            <section id="sec-reviews" className="section-card">
              <h2>レビュー</h2>
              <div className="review-summary">
                <div>
                  <div className="review-rating-big">{trainer.rating}</div>
                  <div style={{ fontSize: 12, color: "var(--c-muted)", marginTop: 4 }}>
                    {trainer.reviewCount}件のレビュー
                  </div>
                </div>
                <p style={{ flex: 1, color: "var(--c-text)", lineHeight: 1.8 }}>
                  「指導が丁寧」「食事のフィードバックが助かる」「結果がちゃんと出た」と
                  受講者から高い評価を得ているトレーナーです。
                </p>
              </div>
              <div className="review-locked">
                残りのレビューを見るには会員登録（無料）が必要です
                <br />
                <button type="button" className="btn-unlock" data-pending="true">
                  無料登録してすべてのレビューを見る
                </button>
              </div>
            </section>
          </main>

          <aside>
            <div className="cta-card">
              <div className="cta-card-header">
                <h3>このトレーナーに相談する</h3>
                <p>登録30秒・営業カウンセリング不要</p>
              </div>
              <div className="cta-card-body">
                <button type="button" className="cta-btn-main" data-pending="true">
                  事前に質問する（無料）
                </button>
                <button type="button" className="cta-btn-sub" data-pending="true">
                  気になるリストに保存
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
