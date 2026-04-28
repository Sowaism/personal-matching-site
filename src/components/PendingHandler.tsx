"use client";

import { useEffect } from "react";

export default function PendingHandler() {
  useEffect(() => {
    let toastEl: HTMLDivElement | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function showToast(label: string) {
      if (!toastEl) {
        toastEl = document.createElement("div");
        toastEl.className = "site-toast";
        document.body.appendChild(toastEl);
      }
      toastEl.textContent = `「${label}」は現在準備中です`;
      requestAnimationFrame(() => {
        toastEl?.classList.add("is-visible");
      });
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        toastEl?.classList.remove("is-visible");
      }, 2400);
    }

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-pending]"
      ) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      showToast(target.textContent?.trim() || "この機能");
    }

    document.body.addEventListener("click", onClick);
    return () => {
      document.body.removeEventListener("click", onClick);
      if (timer) clearTimeout(timer);
      toastEl?.remove();
    };
  }, []);

  return null;
}
