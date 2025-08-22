// Utility functions for accessing site data

import siteData from '@/data/siteData.json';
import { SiteData, PageData } from '@/types/siteData';

export const getSiteData = (): SiteData => siteData as SiteData;

export const getPageBySlug = (slug: string): PageData | null => {
  const data = getSiteData();
  return data.pages?.[slug] || null;
};

export const getAllPages = (): PageData[] => {
  const data = getSiteData();
  return data.pages ? Object.values(data.pages) : [];
};

export const getBlogPosts = (): PageData[] => {
  return [];
};

export const getProducts = (): PageData[] => {
  return [];
};

export const getNavigation = () => {
  return [];
};

export const getSEOData = (slug: string) => {
  return null;
};
