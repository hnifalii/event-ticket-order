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
      range: "events!A2:L",
    });

    const rows = response.data.values;

    const events = rows.map((row) => {
      const img = row[1]

      const type = row[5]; // get ticket type (single/tiered)
      const regPrice = Number(row[6]) || 0;
      const vipPrice = Number(row[7]) || 0;

      let price;

      if (type === "single") {
        price = { reg: regPrice };
      } else if (type === "tiered") {
        price = { reg: regPrice, vip: vipPrice };
      }

      return {
        event_id: row[0],
        img,
        name: row[2],
        desc: row[3],
        location: row[4],
        type,
        price,
        date: row[8],
        time_start: row[9],
        time_end: row[10],
        event_handle: row[11],
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
