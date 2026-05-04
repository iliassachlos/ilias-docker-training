import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatBigNumber = (value: unknown) => {
  const num = Number(value);

  return isNaN(num) ? String(value) : num.toLocaleString();
};
