import { google } from "googleapis";

console.log("API call hit: /api/tickets");
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

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "events!A2:I",
    });

    const rows = response.data.values;

    const events = rows.map((row) => {
      const type = row[3]; // get ticket type (single/tiered)
      const regPrice = Number(row[4]) || 0;
      const vipPrice = Number(row[5]) || 0;

      let price;

      if (type === "single") {
        price = row[4];
      } else if (type === "tiered") {
        price = { reg: regPrice, vip: vipPrice };
      }

      return {
        event_id: row[0],
        name: row[1],
        desc: row[2],
        type,
        price,
        date: row[6],
        time_start: row[7],
        time_end: row[8],
      };
    });

    return Response.json(events);
  } catch (error) {
    console.error("GOOGLE API ERROR:", error);
    return Response.json(
      { message: "Google Sheets Error", error: String(error) },
      { status: 500 }
    );
  }
}
