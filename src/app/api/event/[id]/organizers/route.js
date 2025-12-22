import { google } from "googleapis";

console.log("API call hit: /api/event/organizers");
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

    const eventOrganizerRows = eventOrganizersRes.data.values || [];

    const organizersByEvent = eventOrganizerRows
      .filter((row) => row[1] == id)
      .map((row) => {
        return {
          id: row[0],
          name: row[3],
        };
      });

    console.log(organizersByEvent);

    return Response.json(organizersByEvent);
  } catch (error) {
    console.error("GOOGLE API ERROR:", error);
    return Response.json(
      { message: "Google Sheets Error", error: String(error) },
      { status: 500 }
    );
  }
}
