"use server";

import { cookies } from "next/headers";
import { db, auth } from "@/firebase/admin";
import { UserRecord } from "firebase-admin/auth";
import { User } from "@/types";

const ONE_WEEK = 60 * 60 * 24 * 7;

// ------------------ SIGN UP ------------------
export async function signUp(params: { uid: string; name: string; email: string; password: string }) {
  try {
    // ✅ Always fetch verified user from Firebase Auth
    const userRecord: UserRecord = await auth.getUser(params.uid);

    if (!userRecord?.email) {
      throw new Error("User does not have a valid email.");
    }

    const userDoc = await db.collection("users").doc(params.uid).get();
    if (userDoc.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    await db.collection("users").doc(params.uid).set({
      name: params.name,
      email: userRecord.email,
       // ✅ ISO string, no Timestamp needed
    });

    return { success: true };
  } catch (e: any) {
    console.error("Error creating user", e);
    return { success: false, message: "Sign-up failed" };
  }
}

// ------------------ SIGN IN ------------------
export async function signIn({ idToken }: { idToken: string }) {
  try {
    const decoded = await auth.verifyIdToken(idToken, true);
    const userRecord = await auth.getUser(decoded.uid);

    if (!userRecord) {
      return { success: false, message: "User not found." };
    }

    await setSessionCookie(idToken);
    return { success: true };
  } catch (e) {
    console.error("Sign-in error:", e);
    return { success: false, message: "Sign-in failed" };
  }
}

// ------------------ SIGN IN WITH GOOGLE ------------------
// export async function signInWithGoogle(idToken: string) {
//   try {
//     const decoded = await auth.verifyIdToken(idToken, true);
//     const userRecord = await auth.getUser(decoded.uid);

//     if (!userRecord) {
//       return { success: false, message: "Google account not found." };
//     }

//     await setSessionCookie(idToken);
//     return { success: true };
//   } catch (e) {
//     console.error("Google sign-in error", e);
//     return { success: false, message: "Google sign-in failed" };
//   }
// }



// ------------------ SIGN IN WITH GOOGLE ------------------
export async function signInWithGoogle(idToken: string) {
  try {
    const decoded = await auth.verifyIdToken(idToken, true);
    const uid = decoded.uid;

    const userRecord = await auth.getUser(uid);
    if (!userRecord) {
      return { success: false, message: "Google account not found." };
    }

    // Ensure Firestore "users" document exists or update it
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      // First-time Google user → create Firestore record
      await userRef.set({
        uid,
        name: userRecord.displayName || decoded.name || "No Name",
        email: userRecord.email || decoded.email,
        provider: "google",
        createdAt: new Date().toISOString(),
      });
    } else {
      // Optional: update existing record with latest info
      await userRef.update({
        name: userRecord.displayName || decoded.name || doc.data()?.name,
        email: userRecord.email || decoded.email || doc.data()?.email,
        provider: "google",
        lastLogin: new Date().toISOString(),
      });
    }

    // Set secure session cookie (your existing logic)
    await setSessionCookie(idToken);

    return { success: true };
  } catch (e) {
    console.error("Google sign-in error", e);
    return { success: false, message: "Google sign-in failed" };
  }
}


// ------------------ FORGOT PASSWORD ------------------
export async function forgotPassword(email: string) {
  return { success: true }; // placeholder, you can hook Firebase Auth here
}

// ------------------ SIGN OUT ------------------
export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
  return { success: true };
}

// ------------------ SET SESSION COOKIE ------------------
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

// ------------------ GET CURRENT USER ------------------
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) return null;

    const data = userDoc.data() || {};

    return {
      id: userDoc.id,
      ...data,
    } as User;
  } catch (e) {
    console.error("getCurrentUser error:", e);
    return null;
  }
}

// ------------------ CHECK AUTHENTICATION ------------------
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
