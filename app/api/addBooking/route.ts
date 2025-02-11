import { google } from "googleapis";
import { NextResponse } from "next/server";
import fs from "fs";

export const dynamic = "force-dynamic"; // Prevents static generation issues

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const KEYFILEPATH = "./credentials.json"; // Ensure this file exists
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.ticketType || !body.ticketPrice) {
      throw new Error("Missing required booking data");
    }

    if (!fs.existsSync(KEYFILEPATH)) {
      throw new Error("Missing Google API credentials.json file");
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    const { name, age, whatsapp, email, upiId, ticketType, ticketPrice, paymentScreenshot } = body;

    const range = "Bookings!A:H";

    const values = [[name, age, whatsapp, email, upiId, ticketType, ticketPrice, paymentScreenshot || ""]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return NextResponse.json({ message: "Booking saved successfully." });
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    return NextResponse.json(
      { error: "Failed to save booking data."},
      { status: 500 }
    );
  }
}
