/*
  # Create bookings table and storage

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `age` (integer)
      - `whatsapp` (text)
      - `email` (text)
      - `upiId` (text)
      - `ticketType` (text)
      - `ticketPrice` (text)
      - `payment_screenshot` (text)
      - `status` (text)

  2. Storage
    - Create bucket for payment screenshots

  3. Security
    - Enable RLS on bookings table
    - Add policies for:
      - Insert: authenticated users only
      - Select: authenticated users only
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  age integer NOT NULL,
  whatsapp text NOT NULL,
  email text NOT NULL,
  upiId text NOT NULL,
  ticketType text NOT NULL,
  ticketPrice text NOT NULL,
  payment_screenshot text NOT NULL,
  status text NOT NULL DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only"
ON bookings FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users only"
ON bookings FOR SELECT
TO authenticated
USING (true);

-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name)
VALUES ('payment-screenshots', 'payment-screenshots')
ON CONFLICT DO NOTHING;

-- Set up storage policies
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-screenshots');

CREATE POLICY "Allow authenticated insert access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment-screenshots');