export type PlanType = "monthly" | "single" | "program";

export type Plan = {
  id: string;
  trainerId: string;
  title: string;
  type: PlanType;
  typeLabel: string;
  price: number;
  priceUnit: string;
  singleNote?: string;
  description: string;
  tags: string[];
  features: string[];
  rating: number;
  reviewCount: number;
  contracts: number;
  badges: ("popular" | "new" | "hot" | "cert")[];
};

export const PLANS: Plan[] = [
  {
    id: "tanaka-monthly",
    trainerId: "tanaka",
    title:
      "【ダイエット集中】3ヶ月で-5kgを目指すパーソナルプログラム",
    type: "monthly",
    typeLabel: "月額継続プラン",
    price: 12000,
    priceUnit: "/月",
    singleNote: "単発 ¥3,000〜",
    description:
      "毎週オンラインセッション+食事フィードバック。継続することでリバウンドしない体に。",
    tags: ["ダイエット", "食事指導", "オンライン"],
    features: ["週1回 60分セッション", "毎日チャット", "食事写真フィードバック"],
    rating: 4.9,
    reviewCount: 86,
    contracts: 230,
    badges: ["popular"],
  },
  {
    id: "yamada-monthly",
    trainerId: "yamada",
    title:
      "【産後ボディメイク】忙しいママのための自宅トレーニング",
    type: "monthly",
    typeLabel: "月額継続プラン",
    price: 8000,
    priceUnit: "/月",
    singleNote: "単発 ¥2,500〜",
    description:
      "産後の体型・体力回復に特化。子育ての合間にできる短時間プログラム。",
    tags: ["産後ケア", "姿勢矯正", "オンライン"],
    features: ["週2回 30分セッション", "子連れOK", "骨盤ケア指導"],
    rating: 5.0,
    reviewCount: 62,
    contracts: 180,
    badges: ["popular", "new"],
  },
  {
    id: "suzuki-program",
    trainerId: "suzuki",
    title: "【競技向け】3ヶ月パフォーマンス向上プログラム",
    type: "program",
    typeLabel: "期間プログラム",
    price: 45000,
    priceUnit: "/3ヶ月",
    description:
      "競技選手向けの3ヶ月集中プログラム。パフォーマンス向上を実測可能なKPIで管理。",
    tags: ["競技向け", "筋力アップ", "対面"],
    features: ["週3回 90分セッション", "動作解析", "個別プログラム"],
    rating: 4.8,
    reviewCount: 124,
    contracts: 310,
    badges: ["hot"],
  },
  {
    id: "ito-single",
    trainerId: "ito",
    title: "【単発】肩こり・姿勢改善ヨガ体験セッション",
    type: "single",
    typeLabel: "単発（1回）",
    price: 2800,
    priceUnit: "/1回",
    description:
      "デスクワーク疲れを30分でリセット。肩こり・腰痛が気になる方にお試しいただける単発セッション。",
    tags: ["ヨガ", "姿勢改善", "オンライン"],
    features: ["30分セッション", "初回相談込み", "録画あり"],
    rating: 4.9,
    reviewCount: 47,
    contracts: 142,
    badges: ["new"],
  },
];

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
