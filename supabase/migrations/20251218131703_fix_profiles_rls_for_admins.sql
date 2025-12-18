/*
  # Fix RLS policies for profiles table to allow admin access

  ## Changes
  - Drop the existing complex admin policy that causes circular dependency
  - Create a simpler admin policy that allows admins to view all profiles
  - This fixes the issue where bookings with profile joins fail to load in admin panel

  ## Security
  - Admins with role='admin' in app_metadata can view all profiles
  - Regular users can still only view their own profile
*/

-- Drop the problematic policy with circular dependency
DROP POLICY IF EXISTS "Admins can view client profiles" ON profiles;

-- Create a simpler policy for admins
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    (((auth.jwt() ->> 'app_metadata')::jsonb ->> 'role') = 'admin')
  );