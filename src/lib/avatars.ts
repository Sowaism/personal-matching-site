/** Decorative avatar gradient swatches (warm-shifted to harmonize with the teal theme) */
export const AVATAR_GRADIENTS: Record<number, string> = {
  1: "linear-gradient(135deg, #fed7aa, #ea580c)",
  2: "linear-gradient(135deg, #93c5fd, #2563eb)",
  3: "linear-gradient(135deg, #fca5a5, #dc2626)",
  4: "linear-gradient(135deg, #fde68a, #d97706)",
  5: "linear-gradient(135deg, #c4b5fd, #7c3aed)",
  6: "linear-gradient(135deg, #fbcfe8, #db2777)",
  7: "linear-gradient(135deg, #fdba74, #ea580c)",
  8: "linear-gradient(135deg, #f9a8d4, #db2777)",
  9: "linear-gradient(135deg, #a5b4fc, #4f46e5)",
  10: "linear-gradient(135deg, #fecaca, #f43f5e)",
  11: "linear-gradient(135deg, #fcd34d, #f59e0b)",
  12: "linear-gradient(135deg, #d8b4fe, #9333ea)",
};

export function avatarGradient(variant: number): string {
  return AVATAR_GRADIENTS[variant] ?? AVATAR_GRADIENTS[1];
}
