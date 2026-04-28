export type TrainerBadge =
  | "popular"
  | "new"
  | "recommend"
  | "verified"
  | "cert"
  | "nda";

export type TrainerCategory =
  | "diet"
  | "muscle"
  | "postpartum"
  | "posture"
  | "sport"
  | "nutrition"
  | "health"
  | "senior";

export type Trainer = {
  id: string;
  name: string;
  /** First kanji of last name, used in the avatar swatch fallback */
  avatarChar: string;
  /** Avatar gradient key (av1..av12) */
  avatarVariant: number;
  /** Optional remote photo URL (used when present, otherwise the avatar gradient is shown) */
  photoUrl?: string;
  subtitle: string;
  contracts: number;
  isOnline: boolean;
  rating: number;
  reviewCount: number;
  categories: TrainerCategory[];
  /** Tag chips shown in card */
  tags: string[];
  description: string;
  monthlyPrice: number;
  singlePrice: number;
  badges: TrainerBadge[];
  certLabel?: string;
};

export const CATEGORY_LABELS: Record<TrainerCategory, string> = {
  diet: "ダイエット・体脂肪管理",
  muscle: "筋力アップ・ボディメイク",
  postpartum: "産後ボディメイク",
  posture: "姿勢矯正・腰痛改善",
  sport: "競技向け・スポーツ",
  nutrition: "食事管理・栄養指導",
  health: "健康維持・シニア向け",
  senior: "健康維持・シニア向け",
};

/** Single source of truth for the prototype trainer dataset */
export const TRAINERS: Trainer[] = [
  {
    id: "tanaka",
    name: "田中 健太 トレーナー",
    avatarChar: "田",
    avatarVariant: 1,
    photoUrl: "https://i.pravatar.cc/240?img=12",
    subtitle: "指導実績 230名 / オンライン対応",
    contracts: 230,
    isOnline: true,
    rating: 4.9,
    reviewCount: 86,
    categories: ["diet", "nutrition"],
    tags: ["ダイエット", "体脂肪管理", "食事指導"],
    description:
      "科学的根拠に基づいたダイエットプログラムで、無理なく続けられる体づくりをサポートします。元スポーツトレーナー歴10年。",
    monthlyPrice: 12000,
    singlePrice: 3000,
    badges: ["popular", "verified", "cert"],
    certLabel: "NSCA認定",
  },
  {
    id: "yamada",
    name: "山田 美咲 トレーナー",
    avatarChar: "山",
    avatarVariant: 2,
    photoUrl: "https://i.pravatar.cc/240?img=47",
    subtitle: "指導実績 180名 / 女性専門",
    contracts: 180,
    isOnline: true,
    rating: 5.0,
    reviewCount: 62,
    categories: ["postpartum", "posture"],
    tags: ["産後ケア", "姿勢矯正", "ヨガ"],
    description:
      "産後の体型・体力回復を専門に指導。忙しいママでも続けられるオンラインプログラムが大好評。",
    monthlyPrice: 8000,
    singlePrice: 2500,
    badges: ["popular", "cert"],
    certLabel: "NESTA認定",
  },
  {
    id: "suzuki",
    name: "鈴木 大輔 トレーナー",
    avatarChar: "鈴",
    avatarVariant: 3,
    photoUrl: "https://i.pravatar.cc/240?img=33",
    subtitle: "指導実績 310名 / NSCA-CSCS",
    contracts: 310,
    isOnline: true,
    rating: 4.8,
    reviewCount: 124,
    categories: ["muscle", "sport"],
    tags: ["筋力アップ", "競技向け", "フォーム"],
    description:
      "競技経験10年のアスリートとしての知見を活かし、筋力・パフォーマンス向上を徹底サポート。初心者からアスリートまで対応。",
    monthlyPrice: 15000,
    singlePrice: 4000,
    badges: ["recommend", "verified"],
    certLabel: "NSCA-CSCS",
  },
  {
    id: "sato",
    name: "佐藤 ゆり トレーナー",
    avatarChar: "佐",
    avatarVariant: 4,
    photoUrl: "https://i.pravatar.cc/240?img=49",
    subtitle: "指導実績 95名 / 食事管理専門",
    contracts: 95,
    isOnline: true,
    rating: 5.0,
    reviewCount: 28,
    categories: ["nutrition", "diet"],
    tags: ["食事管理", "栄養指導", "ダイエット"],
    description:
      "管理栄養士×パーソナルトレーナーの二刀流。食事と運動を同時に最適化し、リバウンドのない体づくりを実現します。",
    monthlyPrice: 10000,
    singlePrice: 3500,
    badges: ["new", "cert"],
    certLabel: "管理栄養士",
  },
  {
    id: "nakamura",
    name: "中村 隆太 トレーナー",
    avatarChar: "中",
    avatarVariant: 5,
    photoUrl: "https://i.pravatar.cc/240?img=15",
    subtitle: "指導実績 415名 / JATI認定",
    contracts: 415,
    isOnline: false,
    rating: 4.7,
    reviewCount: 188,
    categories: ["health", "senior", "posture"],
    tags: ["健康維持", "シニア向け", "腰痛改善"],
    description:
      "50代〜70代のシニア層への指導を得意とし、無理なく続けられるペースで健康寿命を延ばすプログラムを提供しています。",
    monthlyPrice: 7000,
    singlePrice: 2000,
    badges: ["popular"],
    certLabel: "JATI認定",
  },
  {
    id: "ito",
    name: "伊藤 千尋 トレーナー",
    avatarChar: "伊",
    avatarVariant: 6,
    photoUrl: "https://i.pravatar.cc/240?img=44",
    subtitle: "指導実績 142名 / ヨガ指導士",
    contracts: 142,
    isOnline: true,
    rating: 4.9,
    reviewCount: 47,
    categories: ["posture", "health"],
    tags: ["ヨガ", "姿勢改善", "リラクゼーション"],
    description:
      "ヨガ歴12年。デスクワークによる姿勢の歪みや肩こりに特化したプログラムで、心と身体の両面を整えます。",
    monthlyPrice: 9000,
    singlePrice: 2800,
    badges: ["recommend", "cert"],
    certLabel: "ヨガ指導士",
  },
  {
    id: "kobayashi",
    name: "小林 翔 トレーナー",
    avatarChar: "小",
    avatarVariant: 7,
    photoUrl: "https://i.pravatar.cc/240?img=68",
    subtitle: "指導実績 87名 / 男性向け筋トレ",
    contracts: 87,
    isOnline: true,
    rating: 4.7,
    reviewCount: 22,
    categories: ["muscle", "sport"],
    tags: ["筋肥大", "ボディメイク", "増量"],
    description:
      "男性のバルクアップ・ボディメイクを専門。トレーニング科学に基づいた最短ルートで体を大きくします。",
    monthlyPrice: 11000,
    singlePrice: 3000,
    badges: ["new"],
  },
  {
    id: "matsumoto",
    name: "松本 れいか トレーナー",
    avatarChar: "松",
    avatarVariant: 8,
    photoUrl: "https://i.pravatar.cc/240?img=23",
    subtitle: "指導実績 256名 / 美ボディ専門",
    contracts: 256,
    isOnline: true,
    rating: 4.9,
    reviewCount: 91,
    categories: ["diet", "muscle"],
    tags: ["美ボディ", "くびれ", "下半身"],
    description:
      "女性らしいラインを残したまま引き締める指導が得意。下半身痩せ・くびれ作りで多数の実績。",
    monthlyPrice: 13000,
    singlePrice: 3800,
    badges: ["popular", "verified"],
    certLabel: "NSCA認定",
  },
];

export function getTrainerById(id: string): Trainer | undefined {
  return TRAINERS.find((t) => t.id === id);
}

/** Helpers used by the cards / count badges */
export function categoryCount(category: TrainerCategory): number {
  // Use the preview "現在 X名 が登録中" derived numbers; not the count of TRAINERS.
  const counts: Record<TrainerCategory, number> = {
    diet: 42,
    muscle: 38,
    postpartum: 21,
    sport: 17,
    posture: 25,
    nutrition: 19,
    health: 31,
    senior: 14,
  };
  return counts[category];
}

export const TRAINER_TOTAL = 127;
