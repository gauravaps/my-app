"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

/**
 * AuthButtons.jsx
 * - Tailwind CSS based professional auth UI
 * - Paste this file to: app/components/AuthButtons.jsx
 */

export default function AuthButtons() {
  const { data: session } = useSession();

  // Google SVG icon
  const GoogleIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M23.2 12.2c0-.8-.1-1.6-.3-2.3H12v4.3h6.2c-.3 1.9-1.7 3.4-3.6 4.2v3h5.8c3.4-3.1 4.9-8 3.9-12.2z" fill="#4285F4"/>
      <path d="M12 24c3.2 0 5.9-1 7.9-2.7l-3.8-3c-1 0.7-2.3 1.1-4.1 1.1-3.1 0-5.7-2.1-6.6-4.9H1.6v3.1C3.5 21.9 7.5 24 12 24z" fill="#34A853"/>
      <path d="M5.4 14.5a7.2 7.2 0 010-4.9V6.5H1.6a12 12 0 000 10.9l3.8-3z" fill="#FBBC05"/>
      <path d="M12 4.8c1.8 0 3.4.6 4.7 1.6l3.5-3.5C17.9 1 15.1 0 12 0 7.5 0 3.5 2.1 1.6 5.5l3.8 3.1C6.3 7 8.9 4.8 12 4.8z" fill="#EA4335"/>
    </svg>
  );

  if (!session) {
    return (
      <div className="w-full max-w-md mx-auto bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl p-6 flex flex-col gap-6 items-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Welcome to Magic Email Classifier</h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in with your Google account to fetch and classify your recent emails.
          </p>
        </div>

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          aria-label="Sign in with Google"
        >
          <GoogleIcon className="w-5 h-5" />
          <span className="text-sm font-medium text-slate-800">Sign in with Google</span>
        </button>

        <div className="text-xs text-slate-500 text-center">
          <span>We only request read access to your Gmail (read-only).</span>
        </div>
      </div>
    );
  }

  // If signed in
  const avatar = session.user?.image;
  const email = session.user?.email || "Unknown";

  return (
    <div className="w-full max-w-md mx-auto bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm rounded-xl p-4 flex items-center gap-4">
      <div className="flex-shrink-0">
        {avatar ? (
          <img src={avatar} alt="User avatar" className="w-12 h-12 rounded-full object-cover border" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
            {email.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900 truncate">{email}</p>
            <p className="text-xs text-slate-500">Signed in with Google</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="hidden sm:inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Dashboard
            </Link>

            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-2 px-3 py-1 text-sm border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition"
              aria-label="Sign out"
            >
              <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 8v8" />
              </svg>
              <span className="text-slate-700">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
