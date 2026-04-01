import { useEffect, useState } from "react";
import { getPageSections } from "@/data/mockData";

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
    // Mock: load from static data
    // When backend is connected, replace with: api.get(`/page-sections?page=${page}`)
    const data = getPageSections(page);
    setSections(data);
    setLoading(false);
  }, [page]);

  const getSection = (key: string) => sections.find((s) => s.section_key === key);

  return { sections, loading, getSection };
};
