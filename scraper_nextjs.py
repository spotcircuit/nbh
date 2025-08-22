#!/usr/bin/env python3
"""
Nothing Better Health Website Scraper for Next.js/React/Tailwind 4.0
Downloads all content and images for rebuilding with modern stack
"""

import requests
from bs4 import BeautifulSoup
import json
import os
import re
from urllib.parse import urljoin, urlparse, unquote
import time
from datetime import datetime
import hashlib
from pathlib import Path

class NextJSScraper:
    def __init__(self, base_url="https://www.nothingbetterhealth.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        self.visited_urls = set()
        self.downloaded_images = {}  # Map original URL to local path
        
        # Next.js compatible data structure
        self.site_data = {
            "metadata": {
                "siteName": "Nothing Better Health",
                "baseUrl": base_url,
                "scrapedAt": datetime.now().isoformat(),
                "version": "2.0"
            },
            "navigation": {
                "mainMenu": [],
                "footerMenu": [],
                "socialLinks": []
            },
            "pages": {},
            "blog": {
                "posts": {},
                "categories": set(),
                "tags": set()
            },
            "products": {},
            "components": {
                "hero": [],
                "features": [],
                "testimonials": [],
                "cta": [],
                "forms": []
            },
            "media": {
                "images": {},
                "videos": []
            },
            "seo": {}
        }
        
    def clean_text(self, text):
        """Clean and normalize text content"""
        if not text:
            return ""
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'[^\w\s\-.,!?;:()\'"/@#$%&*+=]', '', text)
        return text.strip()
    
    def generate_slug(self, text):
        """Generate URL-friendly slug"""
        text = re.sub(r'[^\w\s-]', '', text.lower())
        text = re.sub(r'[-\s]+', '-', text)
        return text.strip('-')
    
    def download_image(self, img_url, context_page=""):
        """Download image and return local path"""
        if img_url in self.downloaded_images:
            return self.downloaded_images[img_url]
            
        try:
            # Handle relative and absolute URLs
            full_url = urljoin(self.base_url, img_url)
            
            # Generate filename
            parsed = urlparse(full_url)
            filename = os.path.basename(unquote(parsed.path))
            
            # If no filename, generate one
            if not filename or '.' not in filename:
                ext = '.jpg'  # Default extension
                if 'png' in full_url.lower():
                    ext = '.png'
                elif 'gif' in full_url.lower():
                    ext = '.gif'
                elif 'svg' in full_url.lower():
                    ext = '.svg'
                elif 'webp' in full_url.lower():
                    ext = '.webp'
                
                # Generate unique filename based on URL
                filename = hashlib.md5(full_url.encode()).hexdigest()[:12] + ext
            
            # Organize images by context
            if 'product' in context_page.lower():
                subfolder = 'products'
            elif 'blog' in context_page.lower() or 'post' in context_page.lower():
                subfolder = 'blog'
            elif 'hero' in context_page.lower() or 'banner' in context_page.lower():
                subfolder = 'hero'
            elif 'logo' in img_url.lower():
                subfolder = 'logos'
            else:
                subfolder = 'general'
            
            # Create subfolder
            save_dir = Path(f'public/images/{subfolder}')
            save_dir.mkdir(parents=True, exist_ok=True)
            
            # Local path for Next.js
            local_path = f'/images/{subfolder}/{filename}'
            full_save_path = Path(f'public{local_path}')
            
            # Download if not exists
            if not full_save_path.exists():
                print(f"  Downloading: {filename}")
                response = self.session.get(full_url, timeout=10, stream=True)
                response.raise_for_status()
                
                with open(full_save_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
            
            self.downloaded_images[img_url] = local_path
            return local_path
            
        except Exception as e:
            print(f"  Error downloading image {img_url}: {e}")
            return img_url  # Return original URL if download fails
    
    def extract_seo_data(self, soup):
        """Extract SEO metadata"""
        seo = {}
        
        # Title
        title_tag = soup.find('title')
        seo['title'] = title_tag.text.strip() if title_tag else ""
        
        # Meta description
        meta_desc = soup.find('meta', {'name': 'description'})
        seo['description'] = meta_desc.get('content', '') if meta_desc else ""
        
        # Open Graph
        og_data = {}
        for meta in soup.find_all('meta', property=re.compile('^og:')):
            prop = meta.get('property', '').replace('og:', '')
            og_data[prop] = meta.get('content', '')
        seo['openGraph'] = og_data
        
        # Twitter Card
        twitter_data = {}
        for meta in soup.find_all('meta', {'name': re.compile('^twitter:')}):
            name = meta.get('name', '').replace('twitter:', '')
            twitter_data[name] = meta.get('content', '')
        seo['twitter'] = twitter_data
        
        # Keywords
        meta_keywords = soup.find('meta', {'name': 'keywords'})
        seo['keywords'] = meta_keywords.get('content', '').split(',') if meta_keywords else []
        
        # Canonical URL
        canonical = soup.find('link', {'rel': 'canonical'})
        seo['canonical'] = canonical.get('href', '') if canonical else ""
        
        return seo
    
    def extract_navigation(self, soup):
        """Extract navigation structure"""
        nav_data = {
            "mainMenu": [],
            "footerMenu": [],
            "socialLinks": []
        }
        
        # Find navigation elements
        nav_selectors = ['nav', 'header', '[role="navigation"]']
        for selector in nav_selectors:
            nav_elements = soup.select(selector)
            for nav in nav_elements:
                links = nav.find_all('a')
                for link in links:
                    href = link.get('href', '')
                    text = self.clean_text(link.get_text())
                    
                    if href and text:
                        # Download logo if it's an image link
                        img = link.find('img')
                        img_src = None
                        if img:
                            original_src = img.get('src', '')
                            if original_src:
                                img_src = self.download_image(original_src, 'navigation')
                        
                        nav_item = {
                            "text": text,
                            "href": href if href.startswith('http') else f"/{href.lstrip('/')}",
                            "isExternal": not self.base_url in urljoin(self.base_url, href),
                            "image": img_src
                        }
                        
                        # Categorize navigation item
                        parent_classes = ' '.join(nav.get('class', []))
                        if 'footer' in parent_classes.lower():
                            nav_data["footerMenu"].append(nav_item)
                        else:
                            nav_data["mainMenu"].append(nav_item)
        
        # Extract social links
        social_patterns = {
            'facebook': 'facebook',
            'twitter': 'twitter', 
            'x.com': 'x',
            'instagram': 'instagram',
            'linkedin': 'linkedin',
            'youtube': 'youtube',
            'pinterest': 'pinterest',
            'tiktok': 'tiktok'
        }
        
        all_links = soup.find_all('a', href=True)
        for link in all_links:
            href = link.get('href', '').lower()
            for pattern, platform in social_patterns.items():
                if pattern in href:
                    nav_data["socialLinks"].append({
                        "platform": platform,
                        "url": link.get('href', ''),
                        "icon": platform  # For icon component mapping
                    })
                    break
                    
        return nav_data
    
    def extract_components(self, soup, page_url):
        """Extract reusable components from the page"""
        components = {
            "hero": None,
            "features": [],
            "testimonials": [],
            "cta": [],
            "forms": []
        }
        
        # Hero section (usually first large section with image)
        hero_selectors = ['[class*="hero"]', '[class*="banner"]', 'section:first-of-type']
        for selector in hero_selectors:
            hero = soup.select_one(selector)
            if hero:
                hero_data = {
                    "title": "",
                    "subtitle": "",
                    "description": "",
                    "backgroundImage": None,
                    "ctaButtons": []
                }
                
                # Extract hero content
                h1 = hero.find('h1')
                if h1:
                    hero_data["title"] = self.clean_text(h1.get_text())
                
                h2 = hero.find('h2')
                if h2:
                    hero_data["subtitle"] = self.clean_text(h2.get_text())
                
                p = hero.find('p')
                if p:
                    hero_data["description"] = self.clean_text(p.get_text())
                
                # Hero image
                img = hero.find('img')
                if img and img.get('src'):
                    hero_data["backgroundImage"] = self.download_image(img['src'], 'hero')
                
                # CTA buttons
                buttons = hero.find_all(['button', 'a'])
                for btn in buttons[:2]:  # Limit to 2 main CTAs
                    btn_text = self.clean_text(btn.get_text())
                    if btn_text and len(btn_text) < 30:  # Likely a button
                        hero_data["ctaButtons"].append({
                            "text": btn_text,
                            "href": btn.get('href', '#'),
                            "variant": "primary" if len(hero_data["ctaButtons"]) == 0 else "secondary"
                        })
                
                if hero_data["title"] or hero_data["backgroundImage"]:
                    components["hero"] = hero_data
                break
        
        # Feature sections
        feature_selectors = ['[class*="feature"]', '[class*="service"]', '[class*="benefit"]']
        for selector in feature_selectors:
            features = soup.select(selector)
            for feature in features[:6]:  # Limit features
                feature_data = {
                    "title": "",
                    "description": "",
                    "icon": None,
                    "image": None
                }
                
                # Title
                title_elem = feature.find(['h2', 'h3', 'h4'])
                if title_elem:
                    feature_data["title"] = self.clean_text(title_elem.get_text())
                
                # Description
                desc_elem = feature.find('p')
                if desc_elem:
                    feature_data["description"] = self.clean_text(desc_elem.get_text())
                
                # Image
                img = feature.find('img')
                if img and img.get('src'):
                    feature_data["image"] = self.download_image(img['src'], 'features')
                
                if feature_data["title"]:
                    components["features"].append(feature_data)
        
        # Forms
        forms = soup.find_all('form')
        for form in forms:
            form_data = {
                "id": form.get('id', f"form_{len(components['forms'])}"),
                "action": form.get('action', ''),
                "method": form.get('method', 'POST'),
                "fields": []
            }
            
            # Extract fields
            inputs = form.find_all(['input', 'textarea', 'select'])
            for field in inputs:
                if field.get('type') != 'hidden':
                    field_data = {
                        "type": field.get('type', field.name),
                        "name": field.get('name', ''),
                        "label": field.get('placeholder', field.get('name', '')),
                        "required": field.has_attr('required'),
                        "options": []
                    }
                    
                    # For select fields, get options
                    if field.name == 'select':
                        options = field.find_all('option')
                        field_data["options"] = [opt.get_text() for opt in options]
                    
                    form_data["fields"].append(field_data)
            
            if form_data["fields"]:
                components["forms"].append(form_data)
        
        return components
    
    def extract_page_content(self, soup, page_url):
        """Extract main content with images properly mapped"""
        content = {
            "sections": [],
            "images": {}
        }
        
        # Main content areas
        main_content = soup.find('main') or soup.find('article') or soup.find('[role="main"]') or soup.find('body')
        
        if main_content:
            # Process sections
            sections = main_content.find_all(['section', 'div'])
            
            for section in sections:
                section_data = {
                    "id": section.get('id', ''),
                    "className": ' '.join(section.get('class', [])),
                    "heading": None,
                    "content": [],
                    "images": []
                }
                
                # Get section heading
                heading = section.find(['h1', 'h2', 'h3'])
                if heading:
                    section_data["heading"] = {
                        "level": int(heading.name[1]),
                        "text": self.clean_text(heading.get_text())
                    }
                
                # Process content blocks
                for elem in section.find_all(['p', 'ul', 'ol', 'blockquote', 'img', 'figure'], recursive=False):
                    if elem.name == 'img':
                        # Image element
                        img_src = elem.get('src')
                        if img_src:
                            local_path = self.download_image(img_src, page_url)
                            img_data = {
                                "type": "image",
                                "src": local_path,
                                "alt": elem.get('alt', ''),
                                "caption": "",
                                "width": elem.get('width', ''),
                                "height": elem.get('height', '')
                            }
                            section_data["images"].append(local_path)
                            section_data["content"].append(img_data)
                            content["images"][local_path] = img_data
                            
                    elif elem.name == 'figure':
                        # Figure with image and caption
                        img = elem.find('img')
                        if img and img.get('src'):
                            local_path = self.download_image(img['src'], page_url)
                            caption = elem.find('figcaption')
                            img_data = {
                                "type": "figure",
                                "src": local_path,
                                "alt": img.get('alt', ''),
                                "caption": self.clean_text(caption.get_text()) if caption else "",
                                "width": img.get('width', ''),
                                "height": img.get('height', '')
                            }
                            section_data["images"].append(local_path)
                            section_data["content"].append(img_data)
                            content["images"][local_path] = img_data
                            
                    elif elem.name == 'p':
                        # Paragraph - check for inline images
                        text = self.clean_text(elem.get_text())
                        if text:
                            # Check for images within paragraph
                            inline_imgs = elem.find_all('img')
                            for img in inline_imgs:
                                if img.get('src'):
                                    local_path = self.download_image(img['src'], page_url)
                                    section_data["images"].append(local_path)
                            
                            section_data["content"].append({
                                "type": "paragraph",
                                "text": text
                            })
                            
                    elif elem.name in ['ul', 'ol']:
                        # List
                        items = []
                        for li in elem.find_all('li'):
                            items.append(self.clean_text(li.get_text()))
                        if items:
                            section_data["content"].append({
                                "type": "list",
                                "listType": elem.name,
                                "items": items
                            })
                            
                    elif elem.name == 'blockquote':
                        # Blockquote
                        section_data["content"].append({
                            "type": "blockquote",
                            "text": self.clean_text(elem.get_text())
                        })
                
                # Only add section if it has content
                if section_data["content"] or section_data["heading"]:
                    content["sections"].append(section_data)
        
        # Also grab any standalone images not in sections
        all_images = soup.find_all('img')
        for img in all_images:
            src = img.get('src')
            if src and src not in content["images"]:
                local_path = self.download_image(src, page_url)
                content["images"][local_path] = {
                    "src": local_path,
                    "alt": img.get('alt', ''),
                    "pageUrl": page_url
                }
        
        return content
    
    def categorize_page(self, url, soup):
        """Categorize page type based on URL and content"""
        url_lower = url.lower()
        
        # Check URL patterns
        if any(x in url_lower for x in ['blog', 'post', 'article', 'news']):
            return 'blog'
        elif any(x in url_lower for x in ['product', 'shop', 'store', 'item']):
            return 'product'
        elif any(x in url_lower for x in ['about', 'team', 'mission']):
            return 'about'
        elif any(x in url_lower for x in ['contact', 'support']):
            return 'contact'
        elif any(x in url_lower for x in ['service', 'solution']):
            return 'service'
        
        # Check content indicators
        if soup.find('article') or soup.find(class_=re.compile('post|article|blog')):
            return 'blog'
        elif soup.find(class_=re.compile('product|shop|price')):
            return 'product'
        
        return 'page'
    
    def scrape_page(self, url):
        """Scrape a single page with all images"""
        if url in self.visited_urls:
            return None
            
        print(f"\nScraping: {url}")
        self.visited_urls.add(url)
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Generate page slug
            path = urlparse(url).path.strip('/')
            slug = path if path else 'home'
            
            # Extract all data
            page_type = self.categorize_page(url, soup)
            
            page_data = {
                "url": url,
                "slug": slug,
                "type": page_type,
                "scrapedAt": datetime.now().isoformat(),
                "seo": self.extract_seo_data(soup),
                "content": self.extract_page_content(soup, url),
                "components": self.extract_components(soup, url)
            }
            
            # Store in appropriate category
            if page_type == 'blog':
                self.site_data["blog"]["posts"][slug] = page_data
            elif page_type == 'product':
                self.site_data["products"][slug] = page_data
            else:
                self.site_data["pages"][slug] = page_data
            
            # Update SEO data
            self.site_data["seo"][slug] = page_data["seo"]
            
            # Extract navigation (only once from home page)
            if url == self.base_url:
                self.site_data["navigation"] = self.extract_navigation(soup)
            
            # Find internal links to crawl
            internal_links = []
            for link in soup.find_all('a', href=True):
                href = urljoin(url, link['href'])
                parsed = urlparse(href)
                
                # Only follow internal links
                if self.base_url in href and href not in self.visited_urls:
                    # Skip anchors and query parameters for now
                    if not parsed.fragment and not parsed.query:
                        internal_links.append(href)
                        
            return internal_links
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return []
    
    def crawl_site(self, max_pages=100):
        """Crawl the entire site"""
        to_visit = [self.base_url]
        pages_scraped = 0
        
        # Important pages to check
        important_paths = [
            '', '/about', '/contact', '/services', '/products',
            '/blog', '/portfolio', '/testimonials', '/faq',
            '/privacy-policy', '/terms', '/pricing'
        ]
        
        for path in important_paths:
            url = urljoin(self.base_url, path)
            if url not in to_visit:
                to_visit.append(url)
        
        while to_visit and pages_scraped < max_pages:
            url = to_visit.pop(0)
            new_links = self.scrape_page(url)
            
            if new_links:
                for link in new_links:
                    if link not in self.visited_urls and link not in to_visit:
                        to_visit.append(link)
                        
            pages_scraped += 1
            time.sleep(0.5)  # Respectful crawling
            
        print(f"\n✓ Scraping complete! Processed {pages_scraped} pages")
        print(f"✓ Downloaded {len(self.downloaded_images)} images")
        
    def save_nextjs_data(self):
        """Save data in Next.js compatible format"""
        # Create data directory for Next.js
        os.makedirs('src/data', exist_ok=True)
        
        # Save main site data
        site_data_path = 'src/data/siteData.json'
        with open(site_data_path, 'w', encoding='utf-8') as f:
            # Convert sets to lists for JSON serialization
            if isinstance(self.site_data["blog"]["categories"], set):
                self.site_data["blog"]["categories"] = list(self.site_data["blog"]["categories"])
            if isinstance(self.site_data["blog"]["tags"], set):
                self.site_data["blog"]["tags"] = list(self.site_data["blog"]["tags"])
            
            json.dump(self.site_data, f, indent=2, ensure_ascii=False)
        print(f"✓ Saved site data to {site_data_path}")
        
        # Create TypeScript type definitions
        types_content = '''// Auto-generated types from scraped content

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
'''
        
        types_path = 'src/types/siteData.ts'
        os.makedirs('src/types', exist_ok=True)
        with open(types_path, 'w', encoding='utf-8') as f:
            f.write(types_content)
        print(f"✓ Created TypeScript types at {types_path}")
        
        # Create data access utilities
        utils_content = '''// Utility functions for accessing site data

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
'''
        
        utils_path = 'src/lib/siteData.ts'
        os.makedirs('src/lib', exist_ok=True)
        with open(utils_path, 'w', encoding='utf-8') as f:
            f.write(utils_content)
        print(f"✓ Created data utilities at {utils_path}")
        
        # Create summary report
        summary = {
            "statistics": {
                "totalPages": len(self.visited_urls),
                "regularPages": len(self.site_data["pages"]),
                "blogPosts": len(self.site_data["blog"]["posts"]),
                "products": len(self.site_data["products"]),
                "totalImages": len(self.downloaded_images),
                "forms": len(self.site_data["components"]["forms"]),
                "mainMenuItems": len(self.site_data["navigation"]["mainMenu"]),
                "socialLinks": len(self.site_data["navigation"]["socialLinks"])
            },
            "pages": list(self.site_data["pages"].keys()),
            "blogPosts": list(self.site_data["blog"]["posts"].keys()),
            "products": list(self.site_data["products"].keys()),
            "imagesByCategory": {}
        }
        
        # Count images by category
        for path in self.downloaded_images.values():
            category = path.split('/')[2] if len(path.split('/')) > 2 else 'root'
            summary["imagesByCategory"][category] = summary["imagesByCategory"].get(category, 0) + 1
        
        summary_path = 'scrape_summary.json'
        with open(summary_path, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2)
        print(f"✓ Saved summary to {summary_path}")

def main():
    print("🚀 Starting Nothing Better Health scraper for Next.js/React/Tailwind 4.0...")
    print("=" * 60)
    
    scraper = NextJSScraper()
    
    # Crawl the site
    scraper.crawl_site(max_pages=50)
    
    # Save all data
    scraper.save_nextjs_data()
    
    print("\n" + "=" * 60)
    print("✅ Scraping complete!")
    print("\n📁 Created structure:")
    print("  • public/images/     - All downloaded images organized by category")
    print("  • src/data/          - Site content in JSON format")
    print("  • src/types/         - TypeScript type definitions")
    print("  • src/lib/           - Data access utilities")
    print("\n🎨 Ready for Next.js + Tailwind 4.0 development!")

if __name__ == "__main__":
    main()