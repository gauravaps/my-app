"use client";
import { useState } from "react";

export default function ClassifyButton() {
  const [categories, setCategories] = useState("");
  const [loading, setLoading] = useState(false);

  const classifyEmails = async () => {
    setLoading(true);
    setCategories("");

    const emails = JSON.parse(localStorage.getItem("emails")) || [];

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });

      const data = await res.json();
      console.log("Categories:", data);

      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error:", error);
      setCategories("⚠️ Something went wrong while classifying emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold text-slate-900 text-center mb-4">
        🧠 AI Email Classifier
      </h2>

      <p className="text-sm text-slate-600 text-center mb-6">
        Click below to automatically categorize your latest emails using AI.
      </p>

      <div className="flex justify-center">
        <button
          onClick={classifyEmails}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all duration-300 flex items-center gap-2 ${
            loading
              ? "bg-gradient-to-r from-green-400 to-green-500 opacity-80 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>Classifying...</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-3-3v6m5.121-8.121A9 9 0 1112 21a9 9 0 019-9z"
                />
              </svg>
              <span>Classify Emails</span>
            </>
          )}
        </button>
      </div>

      {categories && (
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4"
              />
            </svg>
            Classification Results
          </h3>

          <pre className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
            {categories}
          </pre>
        </div>
      )}
    </div>
  );
}
