/*
  # Add foreign key relationship between bookings and profiles

  1. Changes
    - Add foreign key constraint from bookings.user_id to profiles.id
    - This enables automatic joins in Supabase queries

  2. Security
    - No RLS changes needed
    - This is just establishing the relationship for query purposes
*/

-- Add foreign key constraint from bookings.user_id to profiles.id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'bookings_user_id_fkey'
    AND table_name = 'bookings'
  ) THEN
    ALTER TABLE bookings
    ADD CONSTRAINT bookings_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES profiles(id)
    ON DELETE CASCADE;
  END IF;
END $$;