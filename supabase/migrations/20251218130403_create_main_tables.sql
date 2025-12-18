/*
  # Create main tables for detailing business

  1. New Tables
    - `organizations`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `created_at` (timestamptz)
    
    - `services`
      - `id` (uuid, primary key)
      - `org_id` (uuid, references organizations)
      - `name` (text, not null)
      - `type` (text, check constraint)
      - `duration` (integer, minutes)
      - `base_price` (numeric)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `org_id` (uuid, references organizations)
      - `user_id` (uuid, references auth.users)
      - `service_id` (uuid, references services)
      - `date` (date)
      - `time` (time)
      - `location_type` (text)
      - `address` (text)
      - `status` (text)
      - `estimated_price` (numeric)
      - `final_price` (numeric)
      - `photos` (text array)
      - `notes` (text)
      - `google_event_id` (text)
      - `created_at` (timestamptz)
    
    - `invoices`
      - `id` (uuid, primary key)
      - `org_id` (uuid, references organizations)
      - `booking_id` (uuid, references bookings)
      - `user_id` (uuid, references auth.users)
      - `invoice_number` (text, unique)
      - `amount` (numeric)
      - `status` (text)
      - `pdf_url` (text)
      - `issued_at` (timestamptz)
      - `paid_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for admins to manage their organization's data
    - Add policies for clients to view their own data
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('interior', 'exterior', 'complete', 'polishing')),
  duration integer NOT NULL,
  base_price numeric NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  location_type text NOT NULL CHECK (location_type IN ('home', 'work')),
  address text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  estimated_price numeric NOT NULL,
  final_price numeric,
  photos text[],
  notes text,
  google_event_id text,
  created_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  invoice_number text UNIQUE NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  pdf_url text,
  issued_at timestamptz DEFAULT now(),
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Admins can view own organization"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  );

-- Services policies
CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  )
  WITH CHECK (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  );

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view org bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  );

CREATE POLICY "Admins can update org bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  )
  WITH CHECK (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  );

CREATE POLICY "Admins can delete org bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  );

-- Invoices policies
CREATE POLICY "Users can view own invoices"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view org invoices"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  );

CREATE POLICY "Admins can manage org invoices"
  ON invoices
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  )
  WITH CHECK (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'
    AND org_id = ((auth.jwt() ->> 'app_metadata')::jsonb ->> 'org_id')::uuid
  );