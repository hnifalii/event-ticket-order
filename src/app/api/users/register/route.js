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

  const formData = await request.formData();

  const body = {
    email: formData.get("email"),
    name: formData.get("name"),
    username: formData.get("username"),
    password: formData.get("password"),
    role: "user",
  };

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GS_EMAIL,
        private_key: process.env.GS_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const usersRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "users!A2:F",
    });

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

    if (users.find((u) => u.username === body.username)) {
      return Response.json({
        status: 409,
        message: "Username already exist!",
      });
    }

    if (users.find((u) => u.email === body.email)) {
      return Response.json({
        status: 409,
        message: "Email already exist!",
      });
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "users!A2:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          ["", body.username, body.password, body.email, body.name, body.role],
        ],
      },
    });

    return Response.json({
      status: 201,
      message: "Success create new user!",
    });
  } catch (error) {
    console.error("GOOGLE API ERROR:", error);
    return Response.json({
      status: 500,
      message: "Google Sheets Error",
      error: String(error),
    });
  }
}
