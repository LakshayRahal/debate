import { debateTopicCategories, topicIconMap } from "@/constants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind + conditional classes
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// Normalize text (case + spacing)
const normalize = (text: string) => text.toLowerCase().trim();

/**
 * Find category, keywords, and icon for a debate topic
 */
export const getDebateMeta = (topic: string) => {
  const normalizedTopic = normalize(topic);

  for (const [category, topics] of Object.entries(debateTopicCategories)) {
    const normalizedCategory = normalize(category);

    // Exact match
    if (topics.map(normalize).includes(normalizedTopic)) {
      return {
        category,
        keywords: [topic],
        icon: topicIconMap[normalizedCategory] || topicIconMap["general"],
      };
    }

    // Partial match (e.g., "Should AI be banned?" → "ai")
    if (topics.some((t) => normalizedTopic.includes(normalize(t)))) {
      return {
        category,
        keywords: [topic],
        icon: topicIconMap[normalizedCategory] || topicIconMap["general"],
      };
    }
  }

  // Fallback → General
  return {
    category: "General",
    keywords: [topic],
    icon: topicIconMap["general"],
  };
};

// Get only keywords
export const getDebateKeywords = (topic: string) => {
  return getDebateMeta(topic).keywords;
};

// Get only icon
export const getDebateIcon = (topic: string) => {
  return getDebateMeta(topic).icon;
};
