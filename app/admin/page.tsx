"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  name: string;
  age: string;
  whatsapp: string;
  email: string;
  upiId: string;
  ticketType: string;
  ticketPrice: string;
  paymentScreenshot: string;
  status: string;
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/getBookings");
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.ticketType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or ticket type"
            className="px-4 py-2 border rounded-md shadow-md w-full max-w-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center">Loading bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Ticket Type</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{booking.name}</td>
                    <td className="px-4 py-2">{booking.email}</td>
                    <td className="px-4 py-2">{booking.ticketType}</td>
                    <td className="px-4 py-2">₹{booking.ticketPrice}</td>
                    <td className="px-4 py-2">
                      {booking.status === "verified" ? (
                        <span className="text-green-600 font-semibold">Verified</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => router.push(booking.paymentScreenshot)}
                        className="px-2 py-1 bg-blue-600 text-white rounded-md"
                      >
                        View Screenshot
                      </button>
                      <button
                        onClick={() => alert("Verification pending")}
                        className="px-2 py-1 bg-green-600 text-white rounded-md"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => alert("Delete feature coming soon")}
                        className="px-2 py-1 bg-red-600 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
