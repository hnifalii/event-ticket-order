import { google } from "googleapis";

export async function getTagsFromSheet() {
    try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GS_EMAIL,
        private_key: process.env.GS_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Fetch tags
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "tags!A2:C",
    });

    const tagRows = res.data.values || [];

    // Mapping
    const tags = tagRows.map((row) => {
      return {
        tag_id: row[0],
        name: row[1],
        desc: row[2],
      };
    });

    return Response.json(tags);
  } catch (error) {
    console.error("GOOGLE API ERROR:", error);
    return Response.json(
      { message: "Google Sheets Error", error: String(error) },
      { status: 500 }
    );
  }
}