import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { google } from "googleapis";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accessToken = session.user.accessToken;
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    const res = await gmail.users.messages.list({
      userId: "me",
      maxResults: 15,
    });

    const messageIds = res.data.messages || [];
    const emails = [];

    for (const msg of messageIds) {
      const detail = await gmail.users.messages.get({
        userId: "me",
        id: msg.id,
      });

      const headers = detail.data.payload.headers;

      const from = headers.find((h) => h.name === "From")?.value || "Unknown";
      const subject =
        headers.find((h) => h.name === "Subject")?.value || "No Subject";
      const snippet = detail.data.snippet || "";

      emails.push({ from, subject, snippet });
    }

    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
