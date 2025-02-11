"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const tickets = [
    {
      type: "Single Ticket",
      price: "₹149",
      description: "Perfect for solo celebration",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSetgpfgdv8Dmf4tYdPirdocyMgHgG3Ud5YkoDeXeNCpvvA1MA/viewform?usp=dialog",
    },
    {
      type: "Couple Ticket",
      price: "₹249",
      description: "Share the joy with your partner",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSd0i3IvOXL6ZrVMVnRpvbkT48319EcAxVKTZU3dNw4CxIvT2w/viewform?usp=dialog",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight sm:text-6xl">
            Holi Festival 2025
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join us for the most colorful celebration of the year!
          </p>

          {/* Logos Section
          <div className="flex items-center justify-center gap-6 mb-4">
            <Image src="/udayon.jpeg" alt="Udayon Logo" width={120} height={50} />
            <span className="text-white text-3xl font-bold">✖</span>
            <Image src="/lso.jpeg" alt="LSO Logo" width={120} height={50} />
          </div> */}

          {/* Team Header */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">Team Udayon and LSO</h2>
            </div>
            <p className="text-white/90 text-lg">
              Bringing you the most vibrant Holi celebration
            </p>
          </div>
        </div>

        {/* Instagram Buttons */}
        <div className="flex justify-center gap-8 mb-4">
            <Button 
              onClick={() => window.open("https://instagram.com/teamudayon2025", "_blank")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-6 py-3 rounded-md"
            >
              🟠 Follow Team Udayon
            </Button>

            <Button 
              onClick={() => window.open("https://instagram.com/lifesaviors_org", "_blank")}
              className="bg-gradient-to-r from-yellow-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg px-6 py-3 rounded-md"
            >
              🟠 Follow LSO
            </Button>
          </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 sm:px-6">
          {tickets.map((ticket) => (
            <Card
              key={ticket.type}
              className="group hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/90 transform hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl">{ticket.type}</span>
                  <Ticket className="w-6 h-6 text-purple-600" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                    {ticket.price}
                  </p>
                  <p className="text-gray-600 text-lg">{ticket.description}</p>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                  onClick={() => router.push(ticket.formLink)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-8">Event Details</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Date & Time</h3>
              <p className="text-lg mb-2">March 9, 2025</p>
              <p className="text-lg">10:00 AM - 6:00 PM</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <p className="text-lg mb-2">Will be Revealed soon</p>
              {/* <p className="text-lg">Silchar,Assam, India</p> */}
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Includes</h3>
              <p className="text-lg mb-2">Organic Colors</p>
              <p className="text-lg mb-2">Food & Beverages</p>
              <p className="text-lg">Live DJ</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
