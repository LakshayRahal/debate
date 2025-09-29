// Debate participant (user)
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ProfileMenuProps{
  user: User | null;
}

// Debate Card props for frontend rendering
// export interface DebateCardProps {
//   id?: string;
//   userId?: string;
//   topic: string;
//   category: string;
//   type?: "formal" | "casual";
//   createdAt?: string;
// }


// // Debate arguments or contributions
// export interface Debate {
//   id: string;
//   debateId: string;
//   userId: string;

//   content: string;
//   topic: string;
//   round?:number;
//   category: string;
//   type: "formal" | "casual";
//   stance: "for" | "against"; 

//   createdAt?: string;
// }

export interface Debate {
  id: string;
  debateId: string;
  userId?: string;
  role: "user" | "ai" | "moderator";
  content: string;
  topic: string;
  round: number;
  category: string;
  type: "formal" | "casual";
  stance: "for" | "against";
  level?: "beginner" | "intermediate" | "advanced"; 
  isClosing?: boolean;
  createdAt?: string;
}



export interface DebateCardProps {
  id?: string;
  userId?: string;
  topic: string;
  category: string;
  type?: "formal" | "casual";
  stance?: "for" | "against";
  level?: "beginner" | "intermediate" | "advanced"; // <-- already in place
  rounds?: number;
  createdAt?: string;
}


// Feedback on a debate performance
export interface Feedback {
  id: string;
  debateId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;          // e.g., "Clarity", "Evidence", etc.
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

// Create Feedback params
export interface CreateFeedbackParams {
  debateId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

// Agent (AI / Judge / Moderator) props
export interface AgentProps {
  userName: string;
  userId?: string;
  debateId?: string;
  feedbackId?: string;
  type: "generate" | "debate";  // AI role
  questions?: string[];         // debate starter questions
}

// Routing params
export interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

// Get feedback by debate id
export interface GetFeedbackByDebateIdParams {
  debateId: string;
  userId: string;
}

// Get latest debates for a user
export interface GetLatestDebatesParams {
  userId: string;
  limit?: number;
}

// Auth types
export interface SignInParams {
  email: string;
  idToken: string;
}

export interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
  provider?:string
}

export type FormType = "sign-in" | "sign-up";

// Debate form props (for creating new debates)
export interface DebateFormProps {
  debateId: string;
  topic: string;
  type: "formal" | "casual";
  categories: string[];   // selected categories
  amount: number;         // maybe entry fee / points?
}

// Icons for debate categories
export interface TopicIconProps {
  topic: string;
}
