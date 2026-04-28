import "./page.css";
import TrainersClient from "./TrainersClient";
import type { TrainerCategory } from "@/lib/trainers";

export const metadata = {
  title: "トレーナーを探す",
};

const VALID_GOALS: TrainerCategory[] = [
  "diet",
  "muscle",
  "postpartum",
  "posture",
  "sport",
  "nutrition",
  "health",
  "senior",
];

export default async function TrainersPage({
  searchParams,
}: {
  searchParams: Promise<{ goal?: string }>;
}) {
  const { goal } = await searchParams;
  const initialGoal =
    goal && (VALID_GOALS as string[]).includes(goal)
      ? (goal as TrainerCategory)
      : null;

  return (
    <div className="page-trainers">
      <TrainersClient initialGoal={initialGoal} />
    </div>
  );
}
