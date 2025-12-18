/*
  # Fix booking policies for clients

  1. Changes
    - Drop existing "Users can create bookings" policy
    - Create new policy that allows authenticated users to create bookings without requiring org_id in their metadata
    - Clients can create bookings for any org_id (app will provide the correct one)
    - Users can only create bookings where they are the user_id

  2. Security
    - Users can only create bookings for themselves (user_id = auth.uid())
    - This allows clients to make reservations without admin privileges
*/

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;

-- Create new policy that allows clients to create bookings
CREATE POLICY "Authenticated users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());