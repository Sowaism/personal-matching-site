import NavLink from "./NavLink";
import BrandLink from "./BrandLink";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <BrandLink />
          <nav className="site-nav" aria-label="メイン">
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
