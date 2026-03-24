import { useCallback, useEffect, useRef, useState } from "react";
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

const CMS_UPDATE_KEY = "cms_last_update";

export const usePageContent = (page: string) => {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchTimeoutRef = useRef<number | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const { data: sectionData, error: sectionError } = await supabase
        .from("page_sections")
        .select("*")
        .eq("page", page)
        .eq("is_visible", true)
        .order("sort_order");

      if (sectionError) {
        setSections([]);
        return;
      }

      if (!sectionData || sectionData.length === 0) {
        setSections([]);
        return;
      }

      const sectionIds = sectionData.map((s: any) => s.id);
      const { data: blockData, error: blockError } = await supabase
        .from("content_blocks")
        .select("*")
        .in("section_id", sectionIds)
        .eq("is_visible", true)
        .order("sort_order");

      if (blockError) {
        setSections(
          sectionData.map((s: any) => ({
            ...s,
            metadata: {},
            blocks: [],
          }))
        );
        return;
      }

      const result: PageSection[] = sectionData.map((s: any) => ({
        ...s,
        metadata: {},
        blocks: (blockData || [])
          .filter((b: any) => b.section_id === s.id)
          .map((b: any) => ({ ...b, metadata: b.metadata || {} })),
      }));

      setSections(result);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const scheduleFetch = useCallback(() => {
    if (fetchTimeoutRef.current) {
      window.clearTimeout(fetchTimeoutRef.current);
    }
    fetchTimeoutRef.current = window.setTimeout(() => {
      void fetchContent();
    }, 120);
  }, [fetchContent]);

  useEffect(() => {
    void fetchContent();

    const handleStorageSync = (event: StorageEvent) => {
      if (event.key === CMS_UPDATE_KEY) {
        scheduleFetch();
      }
    };

    const handleCustomSync = () => {
      scheduleFetch();
    };

    const handleVisibilitySync = () => {
      if (document.visibilityState === "visible") {
        scheduleFetch();
      }
    };

    window.addEventListener("storage", handleStorageSync);
    window.addEventListener("page-content-updated", handleCustomSync);
    window.addEventListener("focus", handleCustomSync);
    document.addEventListener("visibilitychange", handleVisibilitySync);

    const interval = window.setInterval(() => {
      scheduleFetch();
    }, 5000);

    return () => {
      window.removeEventListener("storage", handleStorageSync);
      window.removeEventListener("page-content-updated", handleCustomSync);
      window.removeEventListener("focus", handleCustomSync);
      document.removeEventListener("visibilitychange", handleVisibilitySync);

      window.clearInterval(interval);
      if (fetchTimeoutRef.current) {
        window.clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [fetchContent, scheduleFetch]);

  const getSection = (key: string) => sections.find((s) => s.section_key === key);

  return { sections, loading, getSection };
};
