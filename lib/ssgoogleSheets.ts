
import fs from "fs";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const KEYFILEPATH = "./credentials.json"; // Replace with your file path

export const addBookingToSheet = async (bookingData: any) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "YOUR_SPREADSHEET_ID"; // Replace with your Google Sheets ID
  const range = "Bookings!A:F"; // Sheet name

  const values = [
    [
      bookingData.name,
      bookingData.age,
      bookingData.whatsappNumber,
      bookingData.email,
      bookingData.upiId,
      bookingData.ticketType,
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values },
  });

  return { message: "Booking saved successfully." };
};
