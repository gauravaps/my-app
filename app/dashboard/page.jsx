"use client";

import { useEffect, useState } from "react";
import FetchEmailsButton from "../components/FetchEmailsButton";
import ClassifyButton from "../components/ClassifyButton";

export default function Dashboard() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("emails");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setEmails(parsed);
        else if (parsed.emails) setEmails(parsed.emails);
      }
    } catch (e) {
      console.error("Failed to read emails from localStorage", e);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Magic Email Classifier</h1>

      <div>
        <FetchEmailsButton />
      </div>

      <div>
        <h3 className="font-semibold">Emails available: {emails.length}</h3>
        <ul className="space-y-2">
          {emails.map((e, i) => (
            <li key={i} className="border p-2 rounded">
              <strong>{e.subject}</strong>
              <div className="text-sm text-gray-600">{e.from}</div>
              <div className="text-xs text-gray-500">{e.snippet}</div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ClassifyButton emails={emails} />
      </div>
    </div>
  );
}
