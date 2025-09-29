/app
 ├── (auth)/
 │    ├── sign-in/              → Sign-in page
 │    ├── sign-up/              → Sign-up page
 │    └── forgot-password/      → Reset password via email
 │    └── layout.tsx            → Auth layout (optional shared styling)
 │
 ├── (root)/
 │    ├── debate/
 │    │     ├-layout         → Page to start a new debate (choose topic/stance)
 │    │     ├── [id]/           → Live debate session page
 │    │     └── feedback/       → Feedback page after debate
 │    │
 │    
 │    │
 │    ├── layout.tsx            → Global layout (navbar + ProfileMenu)
 │    └── page.tsx              → Landing page (Hero, CTA “Start Debate”)
 │
 ├── api/
 │    └── vapi/
 │          └── generate/route.ts → Backend route (topic + arguments generation)
 │
/components/ui
 ├── Agent.tsx                  → Vapi AI debate agent
 ├── AuthForm.tsx               → Sign-in/Sign-up (with Google)
 ├── FormField.tsx              → Input wrapper
 ├── DebateCard.tsx             → Displays debate sessions
 ├── ProfileMenu.tsx            → Avatar + Upload Image + Sign Out
 └── DisplayTechIcons.tsx       → (Optional) Tech badges/icons
 │
/constants
 └── index.ts                   → Global constants (roles, configs)
/firebase
 ├── admin.ts                   → Firebase Admin SDK setup
 └── client.ts                  → Firebase Client SDK setup
 │
/lib/actions
 ├── auth.actions.ts            → Login, signup, Google auth, forgot/reset
 ├── debate.actions.ts          → Debate logic (create, save turns, feedback)
 ├── general.actions.ts         → Shared actions (AI calls, text processing)
 └── utils.ts                   → Helper functions
 │
/types
 ├── debate.types.ts            → Debate session types
 └── index.ts                   → Shared TS types
 │
/public
 ├── avatars/                   → Default boy/girl avatars
 ├── icons/                     → Any static icons
 └── logo.png                   → App logo
 │
/docs
 ├── ARCHITECTURE.md            → Folder explanations
 ├── FLOW.md                    → User → Debate → Feedback flow
 └── PROMPTS.md                  → Store Vapi/Gemini prompts
