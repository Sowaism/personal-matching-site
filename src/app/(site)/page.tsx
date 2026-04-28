import Link from "next/link";
import "./page.css";
import { TRAINERS, TRAINER_TOTAL } from "@/lib/trainers";
import TrainerCard from "@/components/TrainerCard";
import { categoryCount, type TrainerCategory } from "@/lib/trainers";

const GOALS: { goal: TrainerCategory; emoji: string; title: string }[] = [
  { goal: "diet", emoji: "local_fire_department", title: "ダイエット・体脂肪を落としたい" },
  { goal: "muscle", emoji: "fitness_center", title: "筋肉をつけたい・体型を変えたい" },
  { goal: "postpartum", emoji: "child_friendly", title: "産後ボディメイク・体力回復" },
  { goal: "sport", emoji: "emoji_events", title: "競技向け・スポーツパフォーマンス" },
  { goal: "posture", emoji: "self_improvement", title: "姿勢矯正・腰痛・肩こり改善" },
  { goal: "nutrition", emoji: "restaurant", title: "食事管理・栄養指導" },
  { goal: "health", emoji: "favorite", title: "健康維持・体力づくり" },
  { goal: "senior", emoji: "stars", title: "シニア向け・ゆるやかに始めたい" },
];

const popularTrainers = TRAINERS.slice(0, 6);
const heroDemoTrainers = TRAINERS.slice(0, 3);

export default function Home() {
  return (
    <main className="page-top">
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-left">
              <div className="hero-eyebrow">
                <span className="material-icons">emoji_events</span>
                No.1 パーソナルトレーナーマッチング
              </div>
              <h1 className="hero-title">
                <em>{TRAINER_TOTAL}人のプロ</em>から、
                <br />
                あなたに合う1人を。
              </h1>
              <p className="hero-desc">
                資格・専門・料金で絞り込んで選べる、パーソナルトレーナーのマッチングサイト。
                <br />
                ダイエット・筋トレ・産後ケアまで、本当に合う1人が見つかります。
              </p>
              <div className="hero-cta-group">
                <a href="#" className="btn btn-accent btn-lg" data-pending="true">
                  無料ではじめる（登録30秒）
                </a>
                <Link href="/quiz" className="btn btn-outline-white btn-lg">
                  90秒の診断でトレーナーを探す →
                </Link>
              </div>
              <div className="hero-trust-row">
                <span>
                  <span className="material-icons">check</span>入会金なし
                </span>
                <span>
                  <span className="material-icons">check</span>オンライン対応
                </span>
                <span>
                  <span className="material-icons">check</span>営業カウンセリング不要
                </span>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-num">
                    {TRAINER_TOTAL}
                    <span>名</span>
                  </div>
                  <div className="stat-label">
                    登録
                    <br />
                    トレーナー数
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">
                    ¥8,000<span>〜</span>
                  </div>
                  <div className="stat-label">
                    月額プランの
                    <br />
                    最低価格
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">
                    4.8<span>/5</span>
                  </div>
                  <div className="stat-label">
                    トレーナー
                    <br />
                    平均評価
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              {heroDemoTrainers.map((t) => (
                <div key={t.id} className="trainer-card-demo">
                  <div className="trainer-avatar-demo">
                    <span className="material-icons">fitness_center</span>
                  </div>
                  <div className="trainer-info-demo">
                    <h4>{t.name}</h4>
                    <p>{t.tags.slice(0, 2).join("・")} 専門</p>
                  </div>
                  <div className="trainer-meta-demo">
                    <div className="trainer-rating-demo">
                      <span className="material-icons" style={{ fontSize: "inherit", color: "inherit" }}>
                        star
                      </span>{" "}
                      {t.rating}
                    </div>
                    <div className="trainer-price-demo">
                      ¥{t.monthlyPrice.toLocaleString()}〜/月
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="quiz-banner">
        <div className="container">
          <div className="quiz-banner-inner">
            <div className="quiz-banner-text">
              <h3>
                <span className="material-icons">track_changes</span>{" "}
                どのトレーナーがいいか迷ったら…
              </h3>
              <p>
                目標・生活スタイル・予算を答えるだけ。90秒であなたにぴったりの3名をご提案します。
              </p>
            </div>
            <Link
              href="/quiz"
              className="btn btn-accent"
              style={{ whiteSpace: "nowrap", padding: "16px 36px", fontSize: 15, borderRadius: 10 }}
            >
              無料診断をはじめる →
            </Link>
          </div>
        </div>
      </section>

      <section className="section reasons">
        <div className="container">
          <h2 className="section-title">TIDA Personalが選ばれる３つの理由</h2>
          <p className="section-sub">
            大手ジムでもない、動画サービスでもない。あなただけのパーソナル指導を、リーズナブルに。
          </p>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">
                <span className="material-icons">track_changes</span>
              </div>
              <div className="reason-num">
                {TRAINER_TOTAL}
                <span>名</span>
              </div>
              <div className="reason-label">登録トレーナー数（2026年4月現在）</div>
              <h3 className="reason-title">目標×専門分野でピンポイントに探せる</h3>
              <p className="reason-desc">
                ダイエット、筋力アップ、産後ケア、競技向けなど目的別に絞り込み。資格・実績から最適な1人を見つけられます。
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">
                <span className="material-icons">person</span>
              </div>
              <div className="reason-num">
                100<span>%</span>
              </div>
              <div className="reason-label">マンツーマン個別指導</div>
              <h3 className="reason-title">あなたの体・目標・生活に合わせたオーダーメイド</h3>
              <p className="reason-desc">
                集団レッスンや画一的なプログラムではなく、あなたの現状と目標を直接ヒアリングしたプランで継続サポート。
              </p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">
                <span className="material-icons">payments</span>
              </div>
              <div className="reason-num">
                ¥8,000<span>〜</span>
              </div>
              <div className="reason-label">月額プランの最低価格帯</div>
              <h3 className="reason-title">大手ジムの1/3以下の価格で本格指導</h3>
              <p className="reason-desc">
                スタジオ運営コスト不要のオンライン直契約。単発1回から試せるので、合わなければすぐ別のトレーナーへ切り替えられます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section goals">
        <div className="container">
          <h2 className="section-title">どんな目標をお持ちですか？</h2>
          <p className="section-sub">
            目標を選ぶと、専門のトレーナーだけを絞り込んで表示します
          </p>
          <div className="goals-grid">
            {GOALS.map((g) => (
              <Link
                key={g.goal}
                href={`/trainers?goal=${g.goal}`}
                className="goal-card"
              >
                <span className="material-icons goal-emoji">{g.emoji}</span>
                <div className="goal-title">{g.title}</div>
                <div className="goal-count">{categoryCount(g.goal)}名のトレーナー</div>
              </Link>
            ))}
          </div>
          <div className="goals-cta">
            <Link
              href="/trainers"
              className="btn btn-primary"
              style={{ padding: "16px 40px", fontSize: 15, borderRadius: 10 }}
            >
              すべてのトレーナーを見る →
            </Link>
            <p className="goals-cta-note">
              現在 {TRAINER_TOTAL}名 が登録中 · 無料で閲覧できます
            </p>
          </div>
        </div>
      </section>

      <section className="section trainers">
        <div className="container">
          <div className="trainers-header">
            <div className="trainers-header-text">
              <h2 className="section-title">人気のトレーナー</h2>
              <p className="section-sub">
                実績・評価・専門分野から選ばれた注目トレーナー
              </p>
            </div>
            <Link href="/trainers" className="trainers-all-link">
              すべて見る →
            </Link>
          </div>
          <div className="trainers-grid">
            {popularTrainers.map((t) => (
              <TrainerCard key={t.id} trainer={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section comparison">
        <div className="container">
          <h2 className="section-title">他サービスとの違い</h2>
          <p className="section-sub">
            「合う人を選べる×オンライン×中価格帯」の3軸で立ち位置を整理しました
          </p>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th />
                  <th className="compare-us">
                    <span className="compare-tag">TIDA Personal</span>
                  </th>
                  <th>大手パーソナルジム</th>
                  <th>動画トレーニングサービス</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">月額の目安</th>
                  <td className="compare-us-cell">
                    <strong>¥8,000〜</strong>
                  </td>
                  <td>¥150,000〜</td>
                  <td>¥980〜</td>
                </tr>
                <tr>
                  <th scope="row">指導スタイル</th>
                  <td className="compare-us-cell">
                    <strong>マンツーマン・オンライン</strong>
                  </td>
                  <td>マンツーマン・対面</td>
                  <td>動画視聴・自習</td>
                </tr>
                <tr>
                  <th scope="row">トレーナー選択</th>
                  <td className="compare-us-cell">
                    <strong>127名から自由に選べる</strong>
                  </td>
                  <td>店舗側が割り当て</td>
                  <td>選択不可</td>
                </tr>
                <tr>
                  <th scope="row">入会金</th>
                  <td className="compare-us-cell">
                    <strong>なし</strong>
                  </td>
                  <td>¥30,000〜</td>
                  <td>なし</td>
                </tr>
                <tr>
                  <th scope="row">解約</th>
                  <td className="compare-us-cell">
                    <strong>いつでも</strong>
                  </td>
                  <td>契約期間あり</td>
                  <td>いつでも</td>
                </tr>
                <tr>
                  <th scope="row">食事・体調フィードバック</th>
                  <td className="compare-us-cell">
                    <strong>あり（プランによる）</strong>
                  </td>
                  <td>あり</td>
                  <td>基本なし</td>
                </tr>
              </tbody>
            </table>
            <p className="compare-note">
              ※価格・条件は2026年4月時点の各サービス公開情報を基に当社調べ
            </p>
          </div>
        </div>
      </section>

      <section className="section voices">
        <div className="container">
          <h2 className="section-title">受講者の声</h2>
          <p className="section-sub">
            実際にトレーナーと出会った方々のリアルな声
          </p>
          <div className="voices-grid">
            <article className="voice-card">
              <div className="voice-stars" aria-label="5 / 5">★★★★★</div>
              <p className="voice-quote">
                「3ヶ月通って体重−6kg。家から出ずにできるので続けられました。トレーナーさんが食事の写真にすぐ反応してくれるのが助かる」
              </p>
              <div className="voice-meta">
                <span className="voice-avatar va-1">A</span>
                <div>
                  <div className="voice-name">A.S さん</div>
                  <div className="voice-spec">30代女性 / ダイエット目的</div>
                </div>
              </div>
            </article>
            <article className="voice-card">
              <div className="voice-stars" aria-label="5 / 5">★★★★★</div>
              <p className="voice-quote">
                「産後の体力回復で利用。子どもがいてもオンラインだから始められた。週2回の30分でも体が変わるのを実感しています」
              </p>
              <div className="voice-meta">
                <span className="voice-avatar va-2">M</span>
                <div>
                  <div className="voice-name">M.K さん</div>
                  <div className="voice-spec">30代女性 / 産後ケア</div>
                </div>
              </div>
            </article>
            <article className="voice-card">
              <div className="voice-stars" aria-label="4 / 5">★★★★☆</div>
              <p className="voice-quote">
                「ジム通いが続かなかった自分でも、相性のいいトレーナーに出会えてからは習慣化できた。月¥10,000以下なのも続けやすい理由」
              </p>
              <div className="voice-meta">
                <span className="voice-avatar va-3">T</span>
                <div>
                  <div className="voice-name">T.N さん</div>
                  <div className="voice-spec">40代男性 / 健康維持</div>
                </div>
              </div>
            </article>
            <article className="voice-card">
              <div className="voice-stars" aria-label="5 / 5">★★★★★</div>
              <p className="voice-quote">
                「競技選手向けのトレーナーが見つかったのが大きい。動作解析と数値管理が本格的で、競技パフォーマンスが目に見えて伸びました」
              </p>
              <div className="voice-meta">
                <span className="voice-avatar va-4">K</span>
                <div>
                  <div className="voice-name">K.H さん</div>
                  <div className="voice-spec">20代男性 / 競技向け</div>
                </div>
              </div>
            </article>
          </div>
          <p className="voices-note">
            ※2026年4月時点 体験後アンケートより当社調べ
          </p>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <div className="final-cta-label">
            <span className="material-icons">rocket_launch</span>{" "}
            今すぐ無料ではじめられます
          </div>
          <h2>
            1週間調べても見つからなかった答えが、
            <br />
            プロのトレーナーなら30秒で解決することもあります
          </h2>
          <p>登録無料 · クレジットカード不要 · いつでも解約可能</p>
          <div className="final-cta-buttons">
            <a href="#" className="btn btn-white btn-lg" data-pending="true">
              無料で登録する（30秒）
            </a>
            <Link href="/quiz" className="btn btn-outline-white btn-lg">
              まずは診断でトレーナーを探す
            </Link>
          </div>
          <p className="final-cta-note">
            すでに会員の方は{" "}
            <a href="#" data-pending="true">
              こちらからログイン
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
