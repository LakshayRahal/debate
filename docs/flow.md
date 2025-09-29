User Flow (FLOW.md)

This document explains the end-to-end flow of the Debate + Interview Prep Platform.

1. Authentication Flow

User opens app → sees Landing Page.

Clicks Sign In / Sign Up.

Options:

Email + Password

Continue with Google (Firebase OAuth)

If password forgotten:

Click Forgot Password? → enter email.

Firebase sends a secure reset link.

User clicks link → sets new password → logs in.

2. Profile Menu (Top Right)

Visible after login.

Shows:

User’s uploaded profile image (or default boy/girl avatar).
dropdown menu
emailid
name 



Sign Out (end Firebase session).

3. Debate Flow

User clicks Start Debate.

AI (Vapi + Gemini) generates:

Debate topic.

User stance (for/against).

Counterarguments.

Debate session starts (real-time AI interaction).

User can end session anytime.

4. Feedback Flow

After debate → AI generates feedback:

Strengths

Weaknesses

Suggested improvements

Feedback stored in Firebase Firestore under user’s history.

5. Dashboard Flow

User opens Dashboard.

Views history of:

Past debates

Topics covered

AI feedback

Can re-view feedback or start a new debate.

✅ This FLOW.md now matches your updated architecture with:

Google Login

Forgot Password (reset link)

Profile Menu with Signout + Image