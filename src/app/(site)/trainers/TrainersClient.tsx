"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  TRAINERS,
  type Trainer,
  type TrainerCategory,
} from "@/lib/trainers";
import TrainerCard from "@/components/TrainerCard";

type SortKey = "recommended" | "rating" | "contracts" | "new";

const ALL_CATEGORIES: TrainerCategory[] = [
  "diet",
  "muscle",
  "postpartum",
  "posture",
  "sport",
  "nutrition",
  "health",
  "senior",
];

const PRICE_OPTIONS = [
  { label: "〜5,000円", max: 5000 },
  { label: "〜10,000円", max: 10000 },
  { label: "〜20,000円", max: 20000 },
  { label: "〜30,000円", max: 30000 },
  { label: "30,000円〜", max: Infinity },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "おすすめ" },
  { key: "rating", label: "評価順" },
  { key: "contracts", label: "実績数順" },
  { key: "new", label: "新着" },
];

export default function TrainersClient({
  initialGoal,
}: {
  initialGoal: TrainerCategory | null;
}) {
  const [categories, setCategories] = useState<Set<TrainerCategory>>(
    () => new Set(initialGoal ? [initialGoal] : [])
  );
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = TRAINERS.filter((t) => {
      if (categories.size > 0) {
        const matchesCategory = t.categories.some((c) => categories.has(c));
        if (!matchesCategory) return false;
      }
      if (priceMax !== null && t.monthlyPrice > priceMax) return false;
      if (term) {
        const blob = `${t.name} ${t.subtitle} ${t.tags.join(" ")} ${t.description}`.toLowerCase();
        if (!blob.includes(term)) return false;
      }
      return true;
    });
    list = list.slice().sort(byKey(sort));
    return list;
  }, [categories, priceMax, sort, search]);

  function toggleCategory(cat: TrainerCategory) {
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function clearAll() {
    setCategories(new Set());
    setPriceMax(null);
    setSearch("");
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>
            <span className="material-icons">search</span>
            トレーナーを探す
          </h1>
          <p>
            127名のプロトレーナーから、目標・専門・料金で絞り込んで最適な1人を見つけよう
          </p>
          <div className="hero-search">
            <input
              className="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ダイエット、産後ケア、NSCA認定...など"
            />
            <button
              className="btn-search"
              type="button"
              onClick={() => {
                /* search applies live; this just keeps the UX consistent */
              }}
            >
              検索
            </button>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="breadcrumb">
          <a href="/">ホーム</a>
          <span>›</span>
          <span>トレーナー一覧</span>
        </div>
      </div>

      <div className="container">
        <div className="main-layout">
          <aside className="sidebar">
            <div className="sidebar-header">
              <h3>絞り込み</h3>
              <button type="button" className="clear-btn" onClick={clearAll}>
                クリア
              </button>
            </div>

            <div className="filter-group">
              <span className="filter-label">専門ジャンル</span>
              <div className="check-list">
                {ALL_CATEGORIES.map((cat) => (
                  <label key={cat} className="check-item">
                    <input
                      type="checkbox"
                      checked={categories.has(cat)}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span>{CATEGORY_LABELS[cat]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">月額料金</span>
              <div className="filter-chips price-chips">
                {PRICE_OPTIONS.map((p) => {
                  const active = priceMax === p.max;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      className={active ? "filter-chip active" : "filter-chip"}
                      onClick={() => setPriceMax(active ? null : p.max)}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <main>
            <div className="content-header">
              <div className="results-count">
                <span>{filtered.length}名</span> のトレーナーが見つかりました
              </div>
              <div className="sort-bar">
                <span className="sort-label">並び替え：</span>
                {SORT_OPTIONS.map((s) => (
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

            <div className="active-filters" aria-live="polite">
              {Array.from(categories).map((c) => (
                <div key={c} className="af-chip">
                  {CATEGORY_LABELS[c]}{" "}
                  <button
                    type="button"
                    aria-label={`${CATEGORY_LABELS[c]} を解除`}
                    onClick={() => toggleCategory(c)}
                  >
                    ×
                  </button>
                </div>
              ))}
              {priceMax !== null && (
                <div className="af-chip">
                  {priceMax === Infinity ? "30,000円〜" : `〜${priceMax.toLocaleString()}円`}
                  <button
                    type="button"
                    aria-label="料金フィルタを解除"
                    onClick={() => setPriceMax(null)}
                  >
                    ×
                  </button>
                </div>
              )}
              {search && (
                <div className="af-chip">
                  「{search}」
                  <button
                    type="button"
                    aria-label="検索ワードを解除"
                    onClick={() => setSearch("")}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {filtered.length > 0 ? (
              <div className="trainers-grid">
                {filtered.map((t) => (
                  <TrainerCard key={t.id} trainer={t} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                条件に合うトレーナーが見つかりませんでした。
                <br />
                別の条件で再度お試しください。
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

function byKey(key: SortKey) {
  return (a: Trainer, b: Trainer) => {
    switch (key) {
      case "rating":
        return b.rating - a.rating;
      case "contracts":
        return b.contracts - a.contracts;
      case "new": {
        const aNew = a.badges.includes("new") ? 1 : 0;
        const bNew = b.badges.includes("new") ? 1 : 0;
        return bNew - aNew || b.contracts - a.contracts;
      }
      case "recommended":
      default: {
        const score = (t: Trainer) =>
          (t.badges.includes("recommend") ? 2 : 0) +
          (t.badges.includes("popular") ? 1 : 0) +
          t.rating;
        return score(b) - score(a);
      }
    }
  };
}
