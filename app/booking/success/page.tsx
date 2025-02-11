export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">
            Booking Submitted!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for booking your Holi Festival 2025 ticket. We have received
            your payment details and will verify them shortly. A confirmation email
            will be sent to your registered email address.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}