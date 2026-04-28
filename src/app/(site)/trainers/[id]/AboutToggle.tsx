"use client";

import { useState } from "react";

export default function AboutToggle({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p className={expanded ? "about-text" : "about-text collapsed"}>{text}</p>
      <button
        type="button"
        className="read-more"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "▲ 閉じる" : "続きを読む ▼"}
      </button>
    </>
  );
}
