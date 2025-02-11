"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload file to Google Drive
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "File upload failed.");
      }

      // Retrieve stored booking data
      const bookingData = JSON.parse(sessionStorage.getItem("bookingData") || "{}");

      // Update Google Sheets with image URL
      await fetch("/api/addBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData,
          paymentScreenshot: data.fileUrl, // Google Drive URL
        }),
      });

      alert("Image uploaded successfully! Your booking is confirmed.");
      router.push("/booking/success");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Upload Payment Screenshot
          </h1>

          <p className="text-center text-gray-600">
            Please make a payment and upload your screenshot.
          </p>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Payment Screenshot
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-2 block w-full text-sm border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-6 py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            {loading ? "Uploading..." : "Submit Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
