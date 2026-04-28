"use client";

import { useEffect, useState } from "react";

const SECTIONS: { id: string; label: string }[] = [
  { id: "sec-profile", label: "プロフィール" },
  { id: "sec-about", label: "プラン説明" },
  { id: "sec-courses", label: "コース一覧" },
  { id: "sec-reviews", label: "レビュー" },
];

export default function AnchorNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    let ticking = false;
    function update() {
      const offset = 100;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= offset) current = s.id;
      }
      setActive(current);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <nav className="anchor-nav" aria-label="セクションナビゲーション">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className={s.id === active ? "anchor-btn active" : "anchor-btn"}
          onClick={() => scrollToSection(s.id)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}
