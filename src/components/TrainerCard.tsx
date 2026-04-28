import Link from "next/link";
import type { Trainer } from "@/lib/trainers";
import { avatarGradient } from "@/lib/avatars";

const BADGE_LABELS: Record<string, { label: string; icon: string; cls: string }> = {
  popular: { label: "人気", icon: "local_fire_department", cls: "badge-popular" },
  new: { label: "NEW", icon: "auto_awesome", cls: "badge-new" },
  recommend: { label: "おすすめ", icon: "star", cls: "badge-recommend" },
  verified: { label: "本人確認済", icon: "check", cls: "badge-verified" },
  cert: { label: "認定済", icon: "military_tech", cls: "badge-cert" },
  nda: { label: "NDA締結", icon: "lock", cls: "badge-nda" },
};

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <article className="trainer-card">
      <div className="card-top">
        <div className="card-badges">
          {trainer.badges.map((b) => {
            const meta = BADGE_LABELS[b];
            const label =
              b === "cert" && trainer.certLabel ? trainer.certLabel : meta.label;
            return (
              <span key={b} className={`badge ${meta.cls}`}>
                <span className="material-icons" style={{ fontSize: 11 }}>
                  {meta.icon}
                </span>
                {label}
              </span>
            );
          })}
        </div>
        <div className="card-profile">
          {trainer.photoUrl ? (
            <img
              className="avatar avatar-photo"
              src={trainer.photoUrl}
              alt={trainer.name}
              loading="lazy"
              width={60}
              height={60}
            />
          ) : (
            <div
              className="avatar"
              style={{ background: avatarGradient(trainer.avatarVariant) }}
              aria-hidden="true"
            >
              {trainer.avatarChar}
            </div>
          )}
          <div className="profile-info">
            <h3>{trainer.name}</h3>
            <div className="sub">{trainer.subtitle}</div>
          </div>
        </div>
        <div className="rating">
          <span className="stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="material-icons" style={{ fontSize: "inherit", color: "inherit" }}>
                star
              </span>
            ))}
          </span>{" "}
          {trainer.rating}{" "}
          <span className="reviews">（{trainer.reviewCount}件）</span>
        </div>
        <div className="tags">
          {trainer.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <p className="desc">{trainer.description}</p>
      </div>
      <div className="card-bottom">
        <div>
          <div className="price">
            ¥{trainer.monthlyPrice.toLocaleString()}
            <span>/月〜</span>
          </div>
          <div className="contracts">
            単発 ¥{trainer.singlePrice.toLocaleString()}〜 / 累計指導
            {trainer.contracts}名
          </div>
        </div>
        <Link href={`/trainers/${trainer.id}`} className="btn-card">
          詳細を見る
        </Link>
      </div>
    </article>
  );
}
