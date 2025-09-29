Project Architecture

This project is a Next.js + Firebase + Vapi AI app that started as an AI-powered Interview Preparation Platform and is being extended into a Debate Platform.

Folder Structure
/app

(auth)/

sign-in/, sign-up/ → Authentication pages.

forgot-password/ → Page for requesting password reset link.

(root)/

interview/ → Old interview flow (to be adapted for debate).

debate/ → New debate flow (user debates AI).

layout.tsx → Global layout with navigation bar (includes profile menu).

page.tsx → Landing page.

/app/api/vapi/generate/

Backend route for generating prompts (interview questions → debate topics & arguments).

/components/ui/

AuthForm.tsx → Handles sign-in/up forms (with “Continue with Google” option).

FormField.tsx → Form inputs.

InterviewCard.tsx → Displays interview data.

Agent.tsx → AI agent component (can be extended for debate).

ProfileMenu.tsx → Dropdown menu at top-right with Sign Out and Image Upload options.

(Future) DebateCard.tsx → Displays debate session data.

/constants/

Global constants, config values.

/Firebase/

admin.ts → Admin SDK setup.

client.ts → Client SDK setup.

/lib/actions/

auth.actions.ts → Auth functions (sign-in, sign-up, sign-out, forgot password, Google login).

general.action.ts → General actions (question/feedback generation).

utils.ts → Helper functions.

(Future) debate.actions.ts → Debate-specific logic.

/types/

Shared TypeScript types/interfaces.

/public/

Static assets (default avatars, icons, etc.).

/docs/

Documentation files (this folder).

High-Level Flow

Auth

User signs in with Firebase (email/password).

Can also use Continue with Google.

If password forgotten → request reset link via email.

Profile Menu (top-right)

Shows user’s uploaded image (or default avatar).

Dropdown options: Sign Out, Upload Image.

Create Debate

AI generates debate topic, stance, counterarguments.

Debate Session

User debates live against AI (via Vapi).

Feedback

AI provides feedback on user’s debate performance.

Dashboard

User can see past debates, topics, and feedback.





