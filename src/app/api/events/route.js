import { google } from "googleapis";

console.log("API call hit: /api/events");

export async function GET() {
  console.log("Calling Google Sheets API...");

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GS_EMAIL,
        private_key: process.env.GS_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Fetch events
    const eventsRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "events!A2:N",
    });

    // Fetch event-tickets
    const ticketsRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "event-tickets!A2:G",
    });

    const eventRows = eventsRes.data.values || [];
    const ticketRows = ticketsRes.data.values || [];

    // Tickets for corresponding event
    const ticketsByEvent = {};

    // Getting and mapping tickets
    ticketRows.forEach((row) => {
      const eventId = row[1];

      if (!ticketsByEvent[eventId]) {
        ticketsByEvent[eventId] = [];
      }

      ticketsByEvent[eventId].push({
        ticket_id: row[0],
        name: row[2],
        handle: row[3],
        price: Number(row[4]),
        desc: row[5],
        stock: row[6],
      });
    });

    // Getting events, joined with tickets
    const events = eventRows.map((row) => {

      return {
        event_id: row[0],
        img: row[1],
        name: row[2],
        desc: row[3],
        location: row[4],
        tags: row[13],
        ticket_type: row[5],
        tickets: ticketsByEvent[row[0]] || [],
        date: row[7],
        time_start: row[8],
        time_end: row[9],
        event_handle: row[10],
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
