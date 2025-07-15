import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple emoji detection using Unicode ranges
const emojiRegex =
  /^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]$/u;

// Helper function to detect if a string is an emoji
export function isEmoji(str: string): boolean {
  return emojiRegex.test(str.trim());
}

// Helper function to get fallback image URL
export function getFallbackImageUrl(fallbackEmoji = '🖼️'): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#f3f4f6"/>
      <text x="50" y="60" font-size="40" text-anchor="middle" fill="#6b7280">${fallbackEmoji}</text>
    </svg>
  `)}`;
}
