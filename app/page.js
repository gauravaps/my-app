"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthButtons from "./components/AuthButtons";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard"); 
    }
  }, [session, router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Magic Email Classifier</h1>
      <AuthButtons />
    </main>
  );
}
   