-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Site content table (key-value for all page content)
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_value TEXT,
    content_type TEXT NOT NULL DEFAULT 'text',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (page, section, content_key)
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content" ON public.site_content
FOR SELECT USING (true);

CREATE POLICY "Admins can manage site content" ON public.site_content
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT DEFAULT 'Code',
    category TEXT,
    features TEXT[] DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read services" ON public.services
FOR SELECT USING (true);

CREATE POLICY "Admins can manage services" ON public.services
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Contact messages table
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT,
    name TEXT NOT NULL,
    position TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage contact messages" ON public.contact_messages
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed default services
INSERT INTO public.services (title, description, icon, category, features, sort_order) VALUES
('Web Applications', 'Build powerful, scalable web applications using modern frameworks and cloud-native architecture.', 'Globe', 'web-app', ARRAY['React / Next.js', 'Cloud-native architecture', 'Real-time features', 'API integrations'], 1),
('Mobile Applications', 'Create beautiful, performant mobile apps for iOS and Android with native and cross-platform solutions.', 'Smartphone', 'mobile-app', ARRAY['React Native / Flutter', 'Native iOS & Android', 'Offline-first design', 'Push notifications'], 2),
('Website Development', 'Design and develop stunning, responsive websites that convert visitors into customers.', 'Monitor', 'website', ARRAY['Responsive design', 'SEO optimized', 'CMS integration', 'E-commerce ready'], 3),
('IT Management', 'Comprehensive IT infrastructure management, monitoring, and optimization for your business.', 'Server', 'it-management', ARRAY['24/7 monitoring', 'Cloud migration', 'Backup & recovery', 'Performance tuning'], 4),
('Cybersecurity', 'Protect your digital assets with enterprise-grade security solutions and compliance frameworks.', 'Shield', 'security', ARRAY['Penetration testing', 'Security audits', 'Compliance (GDPR)', 'Incident response'], 5),
('Custom Solutions', 'Bespoke software development for unique challenges that off-the-shelf solutions cannot address.', 'Code', 'other', ARRAY['AI / ML integration', 'IoT solutions', 'Legacy modernization', 'DevOps consulting'], 6);