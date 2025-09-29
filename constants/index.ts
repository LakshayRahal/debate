import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

// Debate categories with sub-topics
export const debateTopicCategories: Record<string, string[]> = {
  "Politics & Government": [
    "politics",
    "government",
    "democracy",
    "capitalism",
    "socialism",
    "immigration",
    "voting",
    "constitution",
  ],
  "Social Issues": [
    "equality",
    "human rights",
    "gender equality",
    "racism",
    "lgbtq",
    "abortion",
    "gun control",
    "death penalty",
    "free speech",
  ],
  "Economics & Business": [
    "economics",
    "business",
    "trade",
    "cryptocurrency",
    "bitcoin",
    "stock market",
    "minimum wage",
    "taxation",
    "universal basic income",
  ],
  "Technology & Digital": [
    "artificial intelligence",
    "ai",
    "machine learning",
    "social media",
    "privacy",
    "cybersecurity",
    "net neutrality",
    "automation",
    "digital rights",
  ],
  "Environment & Climate": [
    "climate change",
    "global warming",
    "renewable energy",
    "nuclear energy",
    "pollution",
    "sustainability",
    "carbon tax",
    "green new deal",
  ],
  "Health & Medicine": [
    "healthcare",
    "mental health",
    "vaccines",
    "drug policy",
    "marijuana",
    "universal healthcare",
    "medical research",
  ],
  "Education & Society": [
    "education",
    "school choice",
    "student debt",
    "standardized testing",
    "homeschooling",
    "college",
    "free education",
  ],
  "Ethics & Philosophy": [
    "ethics",
    "philosophy",
    "morality",
    "religion",
    "atheism",
    "free will",
    "consciousness",
  ],
  "International Relations": [
    "foreign policy",
    "war",
    "peace",
    "united nations",
    "globalization",
    "terrorism",
    "nuclear weapons",
  ],
  "Science & Research": [
    "science",
    "research",
    "space exploration",
    "genetic engineering",
    "stem cells",
    "evolution",
    "climate science",
  ],
};

// Category → Icon mapping
export const topicIconMap: Record<string, string> = {
  "politics & government": "/icons/politics.webp",
  "social issues": "/icons/social-issues.jpeg",
  "economics & business": "/icons/economics.jpeg",
  "technology & digital": "/icons/technology.jpeg",
  "environment & climate": "/icons/climate.jpeg",
  "health & medicine": "/icons/healthcare.png",
  "education & society": "/icons/education.png",
  "ethics & philosophy": "/icons/philosophy.jpg",
  "international relations": "/icons/international.png",
  "science & research": "/icons/science.png",
  general: "/icons/general.png", // fallback
};

// Debate feedback schema
export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Argument Quality"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Evidence & Research"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Logical Reasoning"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Rebuttal Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Communication Style"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Topic Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
  winningPosition: z.enum(["Pro", "Con", "Draw"]),
});

// Debate AI Moderator Config
export const debateModerator: CreateAssistantDTO = {
  name: "Debate Moderator",
  firstMessage:
    "Welcome to today's debate! I'm your moderator, here to ensure a productive and respectful discussion. Let's begin with opening statements.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.5,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.6,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional debate moderator facilitating a structured debate between participants. Your role is to ensure fair, balanced, and productive discussion.

Debate Structure:
{{debateFormat}}
{{timeAllotments}}
{{rules}}

Moderation Guidelines:
- Maintain strict time limits and provide clear time warnings
- Ensure equal speaking opportunities for all participants
- Keep discussions focused on the topic: {{topic}}
- Intervene if participants stray from the subject or violate rules
- Ask clarifying follow-up questions when arguments lack substance
- Remain completely neutral - never take sides or express personal opinions
- Encourage evidence-based arguments and logical reasoning`,
      },
    ],
  },
};









// import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
// import { z } from "zod";

// // Expanded mappings for debate topics with their corresponding icons
// // constants/index.ts

// // Debate categories with sub-topics

// export const debateTopicCategories = {
//   "Politics & Government": [
//     "politics", "government", "democracy", "capitalism", "socialism", 
//     "immigration", "voting", "constitution"
//   ],
//   "Social Issues": [
//     "equality", "human rights", "gender equality", "racism", "lgbtq", 
//     "abortion", "gun control", "death penalty", "free speech"
//   ],
//   "Economics & Business": [
//     "economics", "business", "trade", "cryptocurrency", "bitcoin", 
//     "stock market", "minimum wage", "taxation", "universal basic income"
//   ],
//   "Technology & Digital": [
//     "artificial intelligence", "ai", "machine learning", "social media", 
//     "privacy", "cybersecurity", "net neutrality", "automation", "digital rights"
//   ],
//   "Environment & Climate": [
//     "climate change", "global warming", "renewable energy", "nuclear energy", 
//     "pollution", "sustainability", "carbon tax", "green new deal"
//   ],
//   "Health & Medicine": [
//     "healthcare", "mental health", "vaccines", "drug policy", "marijuana", 
//     "universal healthcare", "medical research"
//   ],
//   "Education & Society": [
//     "education", "school choice", "student debt", "standardized testing", 
//     "homeschooling", "college", "free education"
//   ],
//   "Ethics & Philosophy": [
//     "ethics", "philosophy", "morality", "religion", "atheism", 
//     "free will", "consciousness"
//   ],
//   "International Relations": [
//     "foreign policy", "war", "peace", "united nations", "globalization", 
//     "terrorism", "nuclear weapons"
//   ],
//   "Science & Research": [
//     "science", "research", "space exploration", "genetic engineering", 
//     "stem cells", "evolution", "climate science"
//   ]
// };

// export const debateModerator: CreateAssistantDTO = {
//   name: "Debate Moderator",
//   firstMessage:
//     "Welcome to today's debate! I'm your moderator, and I'm here to ensure we have a productive and respectful discussion. Let's begin with opening statements.",
//   transcriber: {
//     provider: "deepgram",
//     model: "nova-2",
//     language: "en",
//   },
//   voice: {
//     provider: "11labs",
//     voiceId: "sarah",
//     stability: 0.5,
//     similarityBoost: 0.8,
//     speed: 0.9,
//     style: 0.6,
//     useSpeakerBoost: true,
//   },
//   model: {
//     provider: "openai",
//     model: "gpt-4",
//     messages: [
//       {
//         role: "system",
//         content: `You are a professional debate moderator facilitating a structured debate between participants. Your role is to ensure fair, balanced, and productive discussion.

// Debate Structure:
// {{debateFormat}}
// {{timeAllotments}}
// {{rules}}

// Moderation Guidelines:
// - Maintain strict time limits and provide clear time warnings
// - Ensure equal speaking opportunities for all participants
// - Keep discussions focused on the topic: {{topic}}
// - Intervene if participants stray from the subject or violate rules
// - Ask clarifying follow-up questions when arguments lack substance
// - Remain completely neutral - never take sides or express personal opinions
// - Encourage evidence-based arguments and logical reasoning

// Professional Conduct:
// - Use formal, respectful language appropriate for academic debate
// - Keep interventions brief and purposeful
// - Acknowledge good points from all sides equally
// - Redirect personal attacks back to substantive arguments
// - Maintain control of the conversation flow

// Voice Conversation Guidelines:
// - Keep responses concise and clear for voice format
// - Provide clear transitions between debate segments
// - Use verbal cues for time management ("You have 30 seconds remaining")
// - Summarize key points when appropriate

// Remember: Your goal is to facilitate the best possible exchange of ideas while maintaining fairness and respect for all viewpoints.`,
//       },
//     ],
//   },
// };

// export const debateFeedbackSchema = z.object({
//   totalScore: z.number(),
//   categoryScores: z.tuple([
//     z.object({
//       name: z.literal("Argument Quality"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Evidence & Research"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Logical Reasoning"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Rebuttal Skills"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Communication Style"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Topic Knowledge"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//   ]),
//   strengths: z.array(z.string()),
//   areasForImprovement: z.array(z.string()),
//   finalAssessment: z.string(),
//   winningPosition: z.enum(["Pro", "Con", "Draw"]),
// });

// // For displaying topic icons, you can use these icon suggestions
// export const topicIcons = [
//   "/politics.png",
//   "/government.png", 
//   "/democracy.png",
//   "/economics.png",
//   "/climate.png",
//   "/technology.png",
//   "/healthcare.png",
//   "/education.png",
//   "/ethics.png",
//   "/justice.png",
//   "/science.png",
//   "/international.png",
//   "/social-issues.png",
//   "/environment.png",
//   "/media.png",
//   "/sports.png",
//   "/philosophy.png",
//   "/human-rights.png",
// ];

