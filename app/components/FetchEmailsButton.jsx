"use client";
import { useState } from "react";

export default function FetchEmailsButton() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    const res = await fetch("/api/gmail");
    const data = await res.json();
    console.log("Fetched emails:", data);

    if (data.emails) {
      localStorage.setItem("emails", JSON.stringify(data.emails));
      setEmails(data.emails);
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchEmails}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {loading ? "Fetching..." : "Fetch My Emails"}
      </button>

      <ul className="mt-4 space-y-2">
        {emails.map((email, i) => (
          <li key={i} className="border p-2 rounded">
            <strong>{email.subject}</strong>
            <p className="text-sm text-gray-600">{email.from}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
