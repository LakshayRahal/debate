
import React, { ReactNode } from 'react'
//Import React, and ReactNode type.
// ReactNode = anything React can render (JSX, string, number, array, null, etc.)

import { redirect } from 'next/navigation';
// 'redirect' is a Next.js App Router function for server-side redirects.

import { isAuthenticated } from '@/lib/actions/auth.actions';
// Your custom function that checks if a user is logged in.

// Define the AuthLayout component
// It receives `children` as a prop
// children:ReactNode means it can accept JSX, text, etc.
const AuthLayout = async ({ children }: { children: ReactNode }) => {
  
  // 1. Check if the user is authenticated
  const isUserAuthenticated = await isAuthenticated();
  
  // 2. If user IS authenticated, immediately redirect to home page ("/")
  //    This prevents logged-in users from seeing Sign In/Sign Up pages.
  if (isUserAuthenticated) redirect('/');

  // 3. If user is NOT authenticated, render the auth layout
  //    {children} will be whatever is inside <AuthLayout> ... </AuthLayout>
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

// Export this layout so it can be used in Next.js routing
export default AuthLayout;
