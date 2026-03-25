import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    const fetch = async () => {
      setLoading(true);
      const { data: sectionData } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page", page)
        .eq("is_visible", true)
        .order("sort_order");

      if (!sectionData || sectionData.length === 0) {
        setSections([]);
        setLoading(false);
        return;
      }

      const sectionIds = sectionData.map((s: any) => s.id);
      const { data: blockData } = await supabase
        .from("content_blocks")
        .select("*")
        .in("section_id", sectionIds)
        .eq("is_visible", true)
        .order("sort_order");

      const result: PageSection[] = sectionData.map((s: any) => ({
        ...s,
        metadata: {},
        blocks: (blockData || [])
          .filter((b: any) => b.section_id === s.id)
          .map((b: any) => ({ ...b, metadata: b.metadata || {} })),
      }));

      setSections(result);
      setLoading(false);
    };
    fetch();
  }, [page]);

  const getSection = (key: string) => sections.find((s) => s.section_key === key);

  return { sections, loading, getSection };
};
