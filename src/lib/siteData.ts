// Utility functions for accessing site data

import siteData from '@/data/siteData.json';
import { SiteData, PageData } from '@/types/siteData';

export const getSiteData = (): SiteData => siteData as SiteData;

export const getPageBySlug = (slug: string): PageData | null => {
  const data = getSiteData();
  return data.pages[slug] || data.blog.posts[slug] || data.products[slug] || null;
};

export const getAllPages = (): PageData[] => {
  const data = getSiteData();
  return [
    ...Object.values(data.pages),
    ...Object.values(data.blog.posts),
    ...Object.values(data.products)
  ];
};

export const getBlogPosts = (): PageData[] => {
  const data = getSiteData();
  return Object.values(data.blog.posts);
};

export const getProducts = (): PageData[] => {
  const data = getSiteData();
  return Object.values(data.products);
};

export const getNavigation = () => {
  const data = getSiteData();
  return data.navigation;
};

export const getSEOData = (slug: string) => {
  const data = getSiteData();
  return data.seo[slug] || null;
};
