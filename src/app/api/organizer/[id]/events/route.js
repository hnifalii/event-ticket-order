import { google } from "googleapis";

console.log("API call hit: /api/organizer/[id]/events");
let cacheCount = 0;

export async function GET(request, { params }) {
  const { id } = await params;

  console.log("Calling Google Sheets API...");
  cacheCount++;
  console.log("Google API call:", cacheCount);
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GS_EMAIL,
        private_key: process.env.GS_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const eventOrganizersRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "event-organizers!A2:D",
    });

    const eventsRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "events!A2:L",
    });

    const eventOrganizerRows = eventOrganizersRes.data.values || [];
    const eventRows = eventsRes.data.values || [];

    const eventsByOrganizer = eventOrganizerRows
      .filter((row) => row[2] == id)
      .map((row) => row[1]);

    const events = eventsByOrganizer.map((eventId) => {
      const row = eventRows.find((er) => er[0] == eventId);

      if (!row) return null;

      return {
        event_id: row[0],
        image: row[1],
        name: row[2],
        location: row[4],
      };
    });

    console.log(events);

    return Response.json(events);
  } catch (error) {
    console.error("GOOGLE API ERROR:", error);
    return Response.json(
      { message: "Google Sheets Error", error: String(error) },
      { status: 500 }
    );
  }
}
