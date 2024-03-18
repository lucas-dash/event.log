import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormat(
  amount: number | string,
  priceFrom: boolean,
  isFree: boolean,
  currency: string = "USD",
  locale: string = "en-US",
) {
  if (isFree) {
    return "Free";
  }
  if (priceFrom) {
    return `From ${new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(Number(amount))}`;
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(amount));
}

export function timeFormat(time: string, locale: string = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
  }).format(new Date(time));
}
