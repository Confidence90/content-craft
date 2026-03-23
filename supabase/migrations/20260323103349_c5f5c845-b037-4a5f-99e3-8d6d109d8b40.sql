
-- Create page_sections table
CREATE TABLE public.page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section_key text NOT NULL,
  title_fr text,
  title_en text,
  subtitle_fr text,
  subtitle_en text,
  sort_order integer DEFAULT 0,
  is_visible boolean DEFAULT true,
  bg_variant text DEFAULT 'default',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create content_blocks table
CREATE TABLE public.content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES public.page_sections(id) ON DELETE CASCADE NOT NULL,
  block_type text NOT NULL DEFAULT 'text',
  content_fr text,
  content_en text,
  media_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  sort_order integer DEFAULT 0,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can read page_sections" ON public.page_sections FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read content_blocks" ON public.content_blocks FOR SELECT TO public USING (true);

-- Admin manage
CREATE POLICY "Admins can manage page_sections" ON public.page_sections FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage content_blocks" ON public.content_blocks FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON public.page_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON public.content_blocks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
