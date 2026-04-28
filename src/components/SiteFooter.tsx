import Link from "next/link";
import BrandLink from "./BrandLink";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <BrandLink variant="footer" />
            <p style={{ marginTop: 16 }}>
              あなたの目標に合うプロのパーソナルトレーナーを、オンラインでマッチング。
              ダイエット・筋トレ・産後ケアなど、127名のトレーナーから自分だけの1人を見つけよう。
            </p>
          </div>
          <div className="footer-col">
            <h4>サービス</h4>
            <ul>
              <li>
                <Link href="/trainers">トレーナーを探す</Link>
              </li>
              <li>
                <Link href="/plans">プランを見る</Link>
              </li>
              <li>
                <Link href="/quiz">目標診断</Link>
              </li>
              <li>
                <a href="#" data-pending="true">
                  トレーナー登録
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>目標別</h4>
            <ul>
              <li>
                <Link href="/trainers?goal=diet">ダイエット</Link>
              </li>
              <li>
                <Link href="/trainers?goal=muscle">筋力アップ</Link>
              </li>
              <li>
                <Link href="/trainers?goal=postpartum">産後ケア</Link>
              </li>
              <li>
                <Link href="/trainers?goal=posture">姿勢矯正</Link>
              </li>
              <li>
                <Link href="/trainers?goal=sport">競技向け</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>サポート</h4>
            <ul>
              <li>
                <a href="#" data-pending="true">
                  使い方ガイド
                </a>
              </li>
              <li>
                <a href="#" data-pending="true">
                  よくある質問
                </a>
              </li>
              <li>
                <a href="#" data-pending="true">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" data-pending="true">
                  プレスリリース
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TIDA Personal. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#" data-pending="true">
              利用規約
            </a>
            <a href="#" data-pending="true">
              プライバシーポリシー
            </a>
            <a href="#" data-pending="true">
              特定商取引法
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
