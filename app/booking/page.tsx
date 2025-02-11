"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: "Age must be 18 or above",
  }),
  whatsapp: z.string().min(10, "Please enter a valid WhatsApp number"),
  email: z.string().email("Please enter a valid email address"),
  upiId: z.string().min(5, "Please enter a valid UPI ID"),
});

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketType = searchParams.get("type");
  const ticketPrice = searchParams.get("price");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      whatsapp: "",
      email: "",
      upiId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Save booking data to session storage for later use
      sessionStorage.setItem(
        "bookingData",
        JSON.stringify({
          ...values,
          ticketType,
          ticketPrice,
        })
      );

      // Send data to the server API for Google Sheets storage
      const response = await fetch("/api/addBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ticketType,
          ticketPrice,
          paymentScreenshot: "", // Placeholder for image URL
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save booking data.");
      }

      // Redirect to Upload Page for payment screenshot submission
      router.push("/booking/upload");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Book Your Ticket</h1>
          <div className="mb-8 text-center">
            <p className="text-xl font-semibold text-purple-600">{ticketType}</p>
            <p className="text-lg text-gray-600">{ticketPrice}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter your age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter your WhatsApp number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="upiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your UPI ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                Next Step (Upload Screenshot)
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
