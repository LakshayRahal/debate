// "use client";

// import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import Image from "next/image";
// import { toast } from "sonner";
// import FormField from "./FormField";
// import { useRouter } from "next/navigation";
// import { FormType } from "@/types";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   sendPasswordResetEmail,
// } from "firebase/auth";

// import { signUp, signIn, signInWithGoogle } from "@/lib/actions/auth.actions";
// import { auth, googleProvider } from "@/firebase/client";

// const authFormSchema = (type: FormType) =>
//   z.object({
//     name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
//     email: z.string().email(),
//     password: z.string().min(8),
//   });

// const AuthForm = ({ type }: { type: FormType }) => {
//   const router = useRouter();
//   const formSchema = authFormSchema(type);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { name: "", email: "", password: "" },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       if (type === "sign-up") {
//         const { name, email, password } = values;
//         const userCredentials = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         const result = await signUp({
//           uid: userCredentials.user.uid,
//           name: name!,
//           email,
//           password
//         });

//         if (!result?.success) {
//           toast.error(result?.message);
//           return;
//         }

//         toast.success("Account created successfully. Please sign in.");
//         router.push("/sign-in");
//       } else {
//         const { email, password } = values;
//         const userCredentials = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         const idToken = await userCredentials.user.getIdToken();
//         await signIn({ idToken });

//         toast.success("Signed in successfully.");
//         router.push("/");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("There was an error.");
//     }
//   }

//   async function handleGoogleLogin() {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const idToken = await result.user.getIdToken();
//       await signInWithGoogle(idToken);

//       toast.success("Signed in with Google.");
//       router.push("/");
//     } catch (e) {
//       console.log(e);
//       toast.error("Google login failed.");
//     }
//   }

//   const isSignIn = type === "sign-in";

//   return (
//     <div className="card-border sm:my-3 lg:my-6 lg:min-w-[400px]">
//       <div className="flex flex-col gap-6 card py-14 px-10">
//         {/* App logo */}
//         <div className="flex flex-row gap-2 justify-center">
//           <Image src="/logo4.png" alt="logo" height={30} width={36} />
//           <h2 className="text-white">DebateAI</h2>
//         </div>

//         <h3 className="text-center">
//           {isSignIn
//             ? "Sign in to join AI debates"
//             : "Create an account to start debating"}
//         </h3>

//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="w-full space-y-6 mt-4 form"
//           >
//             {!isSignIn && (
//               <FormField
//                 control={form.control}
//                 name="name"
//                 label="Name"
//                 placeholder="Your Name"
//               />
//             )}
//             <FormField
//               control={form.control}
//               name="email"
//               label="Email"
//               placeholder="Your Email"
//               type="email"
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               label="Password"
//               placeholder="Your Password"
//               type="password"
//             />

//             <Button className="btn w-full" type="submit">
//               {isSignIn ? "Sign in" : "Create an Account"}
//             </Button>
//           </form>
//         </Form>

//         {/* Forgot password */}
//         {isSignIn && (
//           <Link
//             href="/forgot-password"
//             className="text-sm text-user-primary text-center"
//           >
//             Forgot Password?
//           </Link>
//         )}

//         {/* Google Login */}
//         <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
//           Continue with Google
//         </Button>

//         {/* Toggle sign-in/up */}
//         <p className="text-center">
//           {isSignIn ? "No account yet?" : "Already have an account?"}
//           <Link
//             href={!isSignIn ? "/sign-in" : "/sign-up"}
//             className="font-bold text-user-primary ml-1"
//           >
//             {!isSignIn ? "Sign in" : "Sign up"}
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;


"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { FormType } from "@/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { signUp, signIn, signInWithGoogle } from "@/lib/actions/auth.actions";
import { auth, googleProvider, db } from "@/firebase/client"; // db = Firestore

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredentials.user.getIdToken();
        await signIn({ idToken });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "There was an error.");
    }
  }

  // ---------------- Google Login ----------------
  // async function handleGoogleLogin() {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;

  //     // Check if user exists in Firestore
  //     const userDoc = db.collection("users").doc(user.uid);
  //     const doc = await userDoc.get();

  //     if (!doc.exists) {
  //       // Create Firestore document for first-time Google user
  //       await signUp({
  //         uid: user.uid,
  //         name: user.displayName || "No Name",
  //         email: user.email!,
  //         password: "", // Google user has no password
  //         provider: "google",
  //       });
  //     }

  //     // Call backend Google login (for session/auth handling)
  //     const idToken = await user.getIdToken();
  //     await signInWithGoogle(idToken);

  //     toast.success("Signed in with Google.");
  //     router.push("/");
  //   } catch (e: any) {
  //     console.log(e);
  //     toast.error(e.message || "Google login failed.");
  //   }
  // }
  // ---------------------------------------------

async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Get Firebase ID token
    const idToken = await user.getIdToken();

    // Call backend action → will verify & ensure Firestore user doc
    const res = await signInWithGoogle(idToken);

    if (!res?.success) {
      toast.error(res?.message || "Google login failed.");
      return;
    }

    toast.success("Signed in with Google.");
    router.push("/");
  } catch (e: any) {
    console.error(e);
    toast.error(e.message || "Google login failed.");
  }
}


  const isSignIn = type === "sign-in";

  return (
    <div className="card-border sm:my-3 lg:my-6 lg:min-w-[400px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        {/* App logo */}
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo4.png" alt="logo" height={30} width={36} />
          <h2 className="text-white">DebateAI</h2>
        </div>

        <h3 className="text-center">
          {isSignIn
            ? "Sign in to join AI debates"
            : "Create an account to start debating"}
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            />

            <Button className="btn w-full" type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>

        {/* Forgot password */}
        {isSignIn && (
          <Link
            href="/forgot-password"
            className="text-sm text-user-primary text-center"
          >
            Forgot Password?
          </Link>
        )}

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full"
        >
          Continue with Google
        </Button>

        {/* Toggle sign-in/up */}
        <p className="text-center">
          {isSignIn ? "No account yet?" : "Already have an account?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
