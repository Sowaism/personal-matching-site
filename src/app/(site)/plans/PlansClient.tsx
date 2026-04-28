"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PLANS, type PlanType } from "@/lib/plans";
import { getTrainerById } from "@/lib/trainers";
import { avatarGradient } from "@/lib/avatars";

type TabKey = "all" | PlanType;
type SortKey = "recommended" | "rating" | "price" | "new";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "single", label: "単発（1回〜）" },
  { key: "monthly", label: "月額継続" },
  { key: "program", label: "期間プログラム" },
];

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "おすすめ" },
  { key: "rating", label: "評価順" },
  { key: "price", label: "価格が安い順" },
  { key: "new", label: "新着" },
];

export default function PlansClient() {
  const [tab, setTab] = useState<TabKey>("all");
  const [sort, setSort] = useState<SortKey>("recommended");

  const visible = useMemo(() => {
    let list = PLANS.filter((p) => (tab === "all" ? true : p.type === tab));
    list = list.slice().sort((a, b) => {
      switch (sort) {
        case "rating":
          return b.rating - a.rating;
        case "price":
          return a.price - b.price;
        case "new":
          return (b.badges.includes("new") ? 1 : 0) - (a.badges.includes("new") ? 1 : 0);
        default:
          return b.rating - a.rating;
      }
    });
    return list;
  }, [tab, sort]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>プランを見る</h1>
          <p>
            目的別の月額プランから単発レッスンまで、{PLANS.length}件のプランを比較・申込できます
          </p>
          <div className="type-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                className={t.key === tab ? "type-tab active" : "type-tab"}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="breadcrumb">
          <a href="/">ホーム</a>
          <span>›</span>
          <span>プラン一覧</span>
        </div>

        <div className="content-header">
          <div className="results-count">
            <span>{visible.length}件</span> のプランが見つかりました
          </div>
          <div className="sort-bar">
            <span className="sort-label">並び替え：</span>
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                className={s.key === sort ? "sort-btn active" : "sort-btn"}
                onClick={() => setSort(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="plans-grid">
            {visible.map((p) => {
              const trainer = getTrainerById(p.trainerId);
              return (
                <article key={p.id} className="plan-card">
                  <div className="plan-card-inner">
                    <div className="plan-main">
                      <div className="plan-badges">
                        {p.badges.map((b) => (
                          <span key={b} className={`badge badge-${b}`}>
                            {b === "popular" ? "人気" : b === "new" ? "NEW" : b === "hot" ? "注目" : "認定"}
                          </span>
                        ))}
                      </div>
                      <h3 className="plan-title">
                        <Link href={trainer ? `/trainers/${trainer.id}` : "/trainers"}>
                          {p.title}
                        </Link>
                      </h3>
                      {trainer && (
                        <div className="plan-trainer-row">
                          {trainer.photoUrl ? (
                            <img
                              className="mini-avatar mini-avatar-photo"
                              src={trainer.photoUrl}
                              alt={trainer.name}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <div
                              className="mini-avatar"
                              style={{ background: avatarGradient(trainer.avatarVariant) }}
                              aria-hidden="true"
                            >
                              {trainer.avatarChar}
                            </div>
                          )}
                          <div className="trainer-mini">
                            <h4>{trainer.name}</h4>
                            <p>{trainer.subtitle}</p>
                          </div>
                        </div>
                      )}
                      <div className="plan-tags">
                        {p.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="plan-desc">{p.description}</p>
                      <div className="plan-features">
                        {p.features.map((f) => (
                          <span key={f} className="feat">
                            <span className="material-icons" style={{ fontSize: 16, color: "var(--c-primary)" }}>
                              check_circle
                            </span>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="plan-side">
                      <div className="plan-type-label">{p.typeLabel}</div>
                      <div>
                        <div className="plan-price">
                          ¥{p.price.toLocaleString()}
                          <span className="unit">{p.priceUnit}</span>
                        </div>
                        {p.singleNote && <div className="plan-price-note">{p.singleNote}</div>}
                      </div>
                      <div className="rating">
                        <span className="stars" aria-hidden="true">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="material-icons" style={{ fontSize: "inherit", color: "inherit" }}>
                              star
                            </span>
                          ))}
                        </span>{" "}
                        {p.rating}{" "}
                        <span style={{ fontSize: 12, color: "var(--c-muted)" }}>
                          ({p.reviewCount}件)
                        </span>
                      </div>
                      <button type="button" className="btn-plan-primary" data-pending="true">
                        いますぐ申し込む
                      </button>
                      <button type="button" className="btn-plan-secondary" data-pending="true">
                        まずは無料で相談する
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            該当するプランは現在ありません。タブを切り替えてご確認ください。
          </div>
        )}
      </div>
    </>
  );
}
