
-- Create a public storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Allow admins to upload files
CREATE POLICY "Admins can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media' AND
  public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow admins to update files
CREATE POLICY "Admins can update media"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media' AND
  public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow admins to delete files
CREATE POLICY "Admins can delete media"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'media' AND
  public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow anyone to read media files (public bucket)
CREATE POLICY "Anyone can read media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');
