import api from "@/services/api";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
export interface ContentBlock {
  id: number;
  section_id: number;
  block_type: string;
  content_fr: string | null;
  content_en: string | null;
  media_url: string | null;
  metadata: Record<string, any>;
  sort_order: number;
  is_visible: boolean;
}

export interface PageSection {
  id: number;
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
  const { data: sections = [], isLoading: loading } = useQuery({
    queryKey: ["page-sections", page],
    queryFn: () =>
      api.get<PageSection[]>(`/page-sections`, { params: { page } }).then((r) => r.data),
    staleTime: 0,
  });

  const getSection = (key: string) => sections.find((s) => s.section_key === key);
  return { sections, loading, getSection };
};