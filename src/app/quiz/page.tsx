import Link from "next/link";
import "./page.css";
import QuizClient from "./QuizClient";

export const metadata = {
  title: "無料診断",
};

export default function QuizPage() {
  return (
    <>
      <Link
        href="/"
        style={{
          position: "fixed",
          top: 22,
          left: 36,
          zIndex: 100,
          fontSize: 16,
          fontWeight: 800,
          color: "#0f766e",
          letterSpacing: ".05em",
        }}
      >
        TIDA <span style={{ fontWeight: 400, opacity: .6, marginLeft: 6, fontSize: 12, color: "#888" }}>Personal</span>
      </Link>
      <QuizClient />
    </>
  );
}
