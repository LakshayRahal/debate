// "use client";
// import { ProfileMenuProps } from "@/types";
// import { useState } from "react";
// import Image from "next/image";

// const ProfileMenu = ({ user }: ProfileMenuProps) => {
//   const [showInfo, setShowInfo] = useState(false);

//   if (!user) return null;

//   return (
//     <div
//       className="relative cursor-pointer"
//       onMouseEnter={() => setShowInfo(true)}
//       onMouseLeave={() => setShowInfo(false)}
//     >
//       <Image
//         src={ "/avatar.png"}
//         alt="avatar"
//         width={40}
//         height={40}
//         className="rounded-full"
//       />
//       {showInfo && (
//         <div className="absolute right-0 mt-2 bg-gray-100 shadow-lg rounded-lg p-3 w-48">
//           <p className="font-semibold text-gray-600">{user.name}</p>
//           <p className="text-sm text-gray-600">{user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileMenu;


"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ProfileMenuProps } from "@/types";
import SignOutButton from "./SignOutButton"; // existing signout component

const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* Avatar Button */}
      <div
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={"/avatar.png"}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full border border-gray-300"
        />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="mb-3">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
