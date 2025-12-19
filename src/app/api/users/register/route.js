import { google } from "googleapis";

console.log("API call hit: /api/users/register");
let cacheCount = 0;

export async function POST(request) {
  if (request.method !== "POST") {
    return Response.json({
        status: 405,
        message: "Method not allowed!",
    });
  }

  console.log("Calling Google Sheets API...");
  cacheCount++;
  console.log("Google API call:", cacheCount);

  const body = request.body;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GS_EMAIL,
        private_key: process.env.GS_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const usersRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "users!A2:F",
    });

    const userRows = usersRes.data.values || [];

    if (userRows.find((u) => u.username === body.username)) {
      return Response.json({
        status: 409,
        message: "Username already exist!",
      });
    }

    if (userRows.find((u) => u.email === body.email)) {
      return Response.json({
        status: 409,
        message: "Email already exist!",
      });
    }

    const response = sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "users!A2:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          ["", body.username, body.password, body.email, body.name, "user"],
        ],
      },
    });

    return Response.json({
        status: 201,
        message: "Success create new user!",
    });
  } catch (error) {
    console.error("GOOGLE API ERROR:", error);
    return Response.json(
      { message: "Google Sheets Error", error: String(error) },
      { status: 500 }
    );
  }
}
