-- Drop the overly permissive insert policy and recreate with anon+authenticated scope
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

-- Allow both anonymous and authenticated users to insert, but restrict columns
CREATE POLICY "Public can submit contact messages" ON public.contact_messages
FOR INSERT TO anon, authenticated
WITH CHECK (
  name IS NOT NULL AND
  email IS NOT NULL AND
  message IS NOT NULL AND
  char_length(name) <= 200 AND
  char_length(email) <= 320 AND
  char_length(message) <= 5000
);