// Auto-generated types from scraped content

export interface SiteMetadata {
  siteName: string;
  baseUrl: string;
  scrapedAt: string;
  version: string;
}

export interface NavigationItem {
  text: string;
  href: string;
  isExternal: boolean;
  image?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
}

export interface ContentBlock {
  type: 'paragraph' | 'list' | 'blockquote' | 'image' | 'figure';
  text?: string;
  items?: string[];
  listType?: 'ul' | 'ol';
  src?: string;
  alt?: string;
  caption?: string;
}

export interface PageSection {
  id: string;
  className: string;
  heading?: {
    level: number;
    text: string;
  };
  content: ContentBlock[];
  images: string[];
}

export interface PageData {
  url: string;
  slug: string;
  type: string;
  scrapedAt: string;
  seo: SEOData;
  content: {
    sections: PageSection[];
    images: Record<string, any>;
  };
  components: any;
}

export interface SiteData {
  metadata: SiteMetadata;
  navigation: {
    mainMenu: NavigationItem[];
    footerMenu: NavigationItem[];
    socialLinks: SocialLink[];
  };
  pages: Record<string, PageData>;
  blog: {
    posts: Record<string, PageData>;
    categories: string[];
    tags: string[];
  };
  products: Record<string, PageData>;
  seo: Record<string, SEOData>;
}
