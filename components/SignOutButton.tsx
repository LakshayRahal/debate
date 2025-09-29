"use client";

import { signOut as signOutServer } from "@/lib/actions/auth.actions";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // 1. Sign out from Firebase client
      await firebaseSignOut(auth);

      // 2. Clear server cookie
      await signOutServer();

      // 3. Redirect to sign-in
      router.push("/sign-in");
    } catch (err) {
      console.error("Sign-out failed", err);
    }
  };

  return (
 <Button
  className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white"
  onClick={handleSignOut}
>
  Sign Out
</Button>

  );
}
