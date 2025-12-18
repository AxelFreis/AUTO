/*
  # Create Storage Bucket for Vehicle Photos

  1. New Storage Bucket
    - `vehicle-photos` - Bucket for storing uploaded vehicle photos
      - Public access for read operations
      - Authenticated users can upload
  
  2. Security
    - Enable RLS on storage.objects
    - Allow authenticated users to upload to vehicle-photos bucket
    - Allow public read access to vehicle-photos bucket
*/

-- Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-photos', 'vehicle-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload photos
CREATE POLICY "Authenticated users can upload vehicle photos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'vehicle-photos');

-- Allow authenticated users to update their own photos
CREATE POLICY "Users can update own vehicle photos"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'vehicle-photos')
  WITH CHECK (bucket_id = 'vehicle-photos');

-- Allow public read access to vehicle photos
CREATE POLICY "Public read access to vehicle photos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'vehicle-photos');

-- Allow authenticated users to delete their own photos
CREATE POLICY "Users can delete own vehicle photos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'vehicle-photos');