import { google } from "googleapis";

console.log("API call hit: /api/users");
let cacheCount = 0;

export async function GET() {
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

    // Fetch users
    const usersRes = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "users!A2:F",
    })

    const userRows = usersRes.data.values || [];

    const users = userRows.map((row) => {
        return {
            id: row[0],
            email: row[3],
            username: row[1],
            password: row[2],
            name: row[4],
            role: row[5],
        };
    });

    return Response.json(users);
  } catch (error) {
    console.error("GOOGLE API ERROR:", error);
    return Response.json(
      { message: "Google Sheets Error", error: String(error) },
      { status: 500 }
    );
  }
}