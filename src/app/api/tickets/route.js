import { google } from "googleapis";

console.log("API call hit: /api/tickets")
let cacheCount = 0

export async function GET() {
  console.log("Calling Google Sheets API...");
  cacheCount++
  console.log("Google API call:", cacheCount)
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GS_EMAIL,
        private_key: process.env.GS_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "events!A2:G",
    });



    const rows = response.data.values;

    const events = rows.map((row) => ({
      id: row[0],
      name: row[1],
      desc: row[2],
      price: row[3],
      date: row[4],
      time_start: row[5],
      time_end: row[6],
    }));

    return Response.json(events);
  } catch (error) {
    console.error("GOOGLE API ERROR:", error)
    return Response.json(
        { message: "Google Sheets Error", error: String(error) }, { status: 500 });
  }
}
