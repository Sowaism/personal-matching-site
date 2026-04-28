import Link from "next/link";
import NavLink from "./NavLink";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            TIDA<span>.</span>Personal
          </Link>
          <nav className="site-nav">
            <NavLink href="/trainers">トレーナーを探す</NavLink>
            <NavLink href="/plans">プランを見る</NavLink>
            <NavLink href="/quiz">診断してみる</NavLink>
            <a href="#" className="nav-link" data-pending="true">
              使い方
            </a>
          </nav>
          <div className="header-actions">
            <a href="#" className="btn-login" data-pending="true">
              ログイン
            </a>
            <a href="#" className="btn-register" data-pending="true">
              無料登録
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
