import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateToStringDate = (date: Date) => {
  const d = `${date?.getFullYear()}-${date?.getDate()}-${date?.getMonth()}`;
  console.log("d", d);
  return d;
};

export const themeOptions = [
  { value: "theme", label: "Theme" },
  { value: "places", label: "Places" },
  { value: "weathers", label: "Weathers" },
  { value: "times", label: "Times" },
  { value: "moods", label: "Moods" },
];
