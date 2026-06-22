import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Exchange rate: 1 USD ≈ 84 INR (approximate)
const USD_RATE = 84;

/**
 * Returns formatted price string showing both INR and USD.
 * Example: "₹6,00,000 ($7,143)"
 */
export function formatPrice(inrAmount: number): string {
  const inr = '₹' + inrAmount.toLocaleString('en-IN');
  const usd = '$' + Math.round(inrAmount / USD_RATE).toLocaleString('en-US');
  return `${inr} (${usd})`;
}

/**
 * Returns just the USD portion of a price.
 * Example: "$7,143"
 */
export function formatUSD(inrAmount: number): string {
  return '$' + Math.round(inrAmount / USD_RATE).toLocaleString('en-US');
}

/**
 * Returns just the INR portion of a price.
 * Example: "₹6,00,000"
 */
export function formatINR(inrAmount: number): string {
  return '₹' + inrAmount.toLocaleString('en-IN');
}
