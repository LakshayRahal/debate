import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import ProfileMenu from "@/components/ProfileMenu";
import { getCurrentUser } from "@/lib/actions/auth.actions";
const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await isAuthenticated();
  if (!user) redirect("/sign-in");
  
const usr=await getCurrentUser();
  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo4.png" alt="Logo" width={85} height={65} />
          <h2 className="text-white text-3xl">DebateWise</h2>
        </Link>

        {/* Avatar → name/email */}
        <ProfileMenu user={usr} />
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
