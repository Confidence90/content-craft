import { useEffect, useState } from "react";
import api from "@/services/api";

export interface ContentBlock {
  id: string;
  section_id: string;
  block_type: string;
  content_fr: string | null;
  content_en: string | null;
  media_url: string | null;
  metadata: Record<string, any>;
  sort_order: number;
  is_visible: boolean;
}

export interface PageSection {
  id: string;
  page: string;
  section_key: string;
  title_fr: string | null;
  title_en: string | null;
  subtitle_fr: string | null;
  subtitle_en: string | null;
  sort_order: number;
  is_visible: boolean;
  bg_variant: string;
  blocks: ContentBlock[];
}

export const usePageContent = (page: string) => {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/pages/${page}/sections`);
        const sectionData: PageSection[] = (data.sections || data || []).map((s: any) => ({
          ...s,
          blocks: (s.blocks || []).map((b: any) => ({ ...b, metadata: b.metadata || {} })),
        }));
        setSections(sectionData);
      } catch {
        setSections([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const getSection = (key: string) => sections.find((s) => s.section_key === key);

  return { sections, loading, getSection };
};
