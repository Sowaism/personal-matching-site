import "./page.css";
import PlansClient from "./PlansClient";

export const metadata = {
  title: "プランを見る",
};

export default function PlansPage() {
  return (
    <div className="page-plans">
      <PlansClient />
    </div>
  );
}
