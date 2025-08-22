#!/usr/bin/env python3
"""
Nothing Better Health Website Scraper
Extracts all content from nothingbetterhealth.com and stores it in organized format
"""

import requests
from bs4 import BeautifulSoup
import json
import os
import re
from urllib.parse import urljoin, urlparse
import time
from datetime import datetime
import hashlib

class NBHScraper:
    def __init__(self, base_url="https://www.nothingbetterhealth.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        self.visited_urls = set()
        self.content_data = {
            "metadata": {
                "site_name": "Nothing Better Health",
                "base_url": base_url,
                "scraped_at": datetime.now().isoformat(),
                "version": "1.0"
            },
            "navigation": {},
            "pages": {},
            "blog_posts": {},
            "products": {},
            "media": {
                "images": [],
                "videos": []
            },
            "components": {}
        }
        
    def clean_text(self, text):
        """Clean and normalize text content"""
        if not text:
            return ""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        # Remove special characters but keep basic punctuation
        text = re.sub(r'[^\w\s\-.,!?;:()\'"/@#$%&*+=]', '', text)
        return text.strip()
    
    def extract_metadata(self, soup):
        """Extract page metadata"""
        metadata = {}
        
        # Title
        title_tag = soup.find('title')
        metadata['title'] = title_tag.text.strip() if title_tag else ""
        
        # Meta tags
        for meta in soup.find_all('meta'):
            name = meta.get('name') or meta.get('property', '')
            content = meta.get('content', '')
            if name and content:
                metadata[name] = content
                
        # Canonical URL
        canonical = soup.find('link', {'rel': 'canonical'})
        if canonical:
            metadata['canonical_url'] = canonical.get('href', '')
            
        return metadata
    
    def extract_navigation(self, soup):
        """Extract navigation menu structure"""
        nav_data = {
            "main_menu": [],
            "footer_menu": [],
            "social_links": []
        }
        
        # Try to find navigation elements
        nav_elements = soup.find_all(['nav', 'header'])
        for nav in nav_elements:
            links = nav.find_all('a')
            for link in links:
                href = link.get('href', '')
                text = self.clean_text(link.get_text())
                if href and text:
                    nav_item = {
                        "text": text,
                        "url": urljoin(self.base_url, href),
                        "type": "internal" if self.base_url in urljoin(self.base_url, href) else "external"
                    }
                    if 'footer' in str(nav.get('class', [])).lower():
                        nav_data["footer_menu"].append(nav_item)
                    else:
                        nav_data["main_menu"].append(nav_item)
        
        # Extract social links
        social_patterns = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'pinterest']
        all_links = soup.find_all('a', href=True)
        for link in all_links:
            href = link.get('href', '').lower()
            for pattern in social_patterns:
                if pattern in href:
                    nav_data["social_links"].append({
                        "platform": pattern,
                        "url": link.get('href', ''),
                        "text": self.clean_text(link.get_text())
                    })
                    break
                    
        return nav_data
    
    def extract_content_sections(self, soup):
        """Extract main content sections from the page"""
        content = {
            "headers": [],
            "paragraphs": [],
            "lists": [],
            "sections": []
        }
        
        # Extract headers
        for i in range(1, 7):
            headers = soup.find_all(f'h{i}')
            for header in headers:
                text = self.clean_text(header.get_text())
                if text:
                    content["headers"].append({
                        "level": i,
                        "text": text,
                        "id": header.get('id', '')
                    })
        
        # Extract paragraphs
        paragraphs = soup.find_all('p')
        for p in paragraphs:
            text = self.clean_text(p.get_text())
            if text and len(text) > 20:  # Filter out very short paragraphs
                content["paragraphs"].append(text)
        
        # Extract lists
        for list_type in ['ul', 'ol']:
            lists = soup.find_all(list_type)
            for lst in lists:
                items = []
                for li in lst.find_all('li'):
                    text = self.clean_text(li.get_text())
                    if text:
                        items.append(text)
                if items:
                    content["lists"].append({
                        "type": list_type,
                        "items": items
                    })
        
        # Extract main content sections
        main_sections = soup.find_all(['section', 'article', 'main'])
        for section in main_sections:
            section_data = {
                "id": section.get('id', ''),
                "class": ' '.join(section.get('class', [])),
                "content": self.clean_text(section.get_text())[:500]  # First 500 chars
            }
            if section_data["content"]:
                content["sections"].append(section_data)
                
        return content
    
    def extract_images(self, soup, page_url):
        """Extract all images from the page"""
        images = []
        img_tags = soup.find_all('img')
        
        for img in img_tags:
            src = img.get('src', '')
            if src:
                img_data = {
                    "src": urljoin(page_url, src),
                    "alt": img.get('alt', ''),
                    "title": img.get('title', ''),
                    "width": img.get('width', ''),
                    "height": img.get('height', ''),
                    "page_url": page_url
                }
                images.append(img_data)
                
        return images
    
    def extract_forms(self, soup):
        """Extract form data from the page"""
        forms = []
        form_tags = soup.find_all('form')
        
        for form in form_tags:
            form_data = {
                "action": form.get('action', ''),
                "method": form.get('method', 'get'),
                "id": form.get('id', ''),
                "fields": []
            }
            
            # Extract form fields
            inputs = form.find_all(['input', 'textarea', 'select'])
            for field in inputs:
                field_data = {
                    "type": field.get('type', field.name),
                    "name": field.get('name', ''),
                    "id": field.get('id', ''),
                    "placeholder": field.get('placeholder', ''),
                    "required": field.has_attr('required')
                }
                form_data["fields"].append(field_data)
                
            if form_data["fields"]:
                forms.append(form_data)
                
        return forms
    
    def scrape_page(self, url):
        """Scrape a single page"""
        if url in self.visited_urls:
            return None
            
        print(f"Scraping: {url}")
        self.visited_urls.add(url)
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Generate page ID
            page_id = hashlib.md5(url.encode()).hexdigest()[:8]
            
            page_data = {
                "url": url,
                "scraped_at": datetime.now().isoformat(),
                "metadata": self.extract_metadata(soup),
                "navigation": self.extract_navigation(soup),
                "content": self.extract_content_sections(soup),
                "images": self.extract_images(soup, url),
                "forms": self.extract_forms(soup)
            }
            
            # Store images in media section
            self.content_data["media"]["images"].extend(page_data["images"])
            
            # Categorize page
            url_path = urlparse(url).path.lower()
            if 'blog' in url_path or 'post' in url_path or 'article' in url_path:
                self.content_data["blog_posts"][page_id] = page_data
            elif 'product' in url_path or 'shop' in url_path:
                self.content_data["products"][page_id] = page_data
            else:
                self.content_data["pages"][page_id] = page_data
                
            # Extract internal links for crawling
            internal_links = []
            for link in soup.find_all('a', href=True):
                href = urljoin(url, link['href'])
                if self.base_url in href and href not in self.visited_urls:
                    internal_links.append(href)
                    
            return internal_links
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return []
    
    def crawl_site(self, max_pages=100):
        """Crawl the entire site"""
        to_visit = [self.base_url]
        pages_scraped = 0
        
        # Common pages to check
        common_paths = [
            '', '/about', '/contact', '/services', '/products', 
            '/blog', '/news', '/faq', '/privacy', '/terms'
        ]
        
        for path in common_paths:
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
            time.sleep(0.5)  # Be respectful to the server
            
        print(f"\nScraping complete! Scraped {pages_scraped} pages")
        
    def save_data(self, output_dir="scraped_content"):
        """Save scraped data in multiple formats"""
        os.makedirs(output_dir, exist_ok=True)
        
        # Save as JSON (complete data)
        json_path = os.path.join(output_dir, "complete_content.json")
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(self.content_data, f, indent=2, ensure_ascii=False)
        print(f"Saved complete data to {json_path}")
        
        # Save pages as individual markdown files
        pages_dir = os.path.join(output_dir, "pages")
        os.makedirs(pages_dir, exist_ok=True)
        
        for page_type in ["pages", "blog_posts", "products"]:
            type_dir = os.path.join(pages_dir, page_type)
            os.makedirs(type_dir, exist_ok=True)
            
            for page_id, page_data in self.content_data[page_type].items():
                md_content = self.convert_to_markdown(page_data)
                md_path = os.path.join(type_dir, f"{page_id}.md")
                with open(md_path, 'w', encoding='utf-8') as f:
                    f.write(md_content)
                    
        # Save summary
        summary_path = os.path.join(output_dir, "summary.json")
        summary = {
            "total_pages": len(self.visited_urls),
            "blog_posts": len(self.content_data["blog_posts"]),
            "products": len(self.content_data["products"]),
            "regular_pages": len(self.content_data["pages"]),
            "images": len(self.content_data["media"]["images"]),
            "scraped_at": self.content_data["metadata"]["scraped_at"]
        }
        with open(summary_path, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2)
        print(f"Saved summary to {summary_path}")
        
    def convert_to_markdown(self, page_data):
        """Convert page data to markdown format"""
        md_lines = []
        
        # Title
        title = page_data.get("metadata", {}).get("title", "Untitled Page")
        md_lines.append(f"# {title}\n")
        
        # Metadata
        md_lines.append(f"**URL:** {page_data.get('url', '')}")
        md_lines.append(f"**Scraped:** {page_data.get('scraped_at', '')}\n")
        
        # Content headers
        content = page_data.get("content", {})
        for header in content.get("headers", []):
            level = header.get("level", 1)
            text = header.get("text", "")
            md_lines.append(f"{'#' * level} {text}")
        
        # Paragraphs
        for para in content.get("paragraphs", []):
            md_lines.append(f"\n{para}\n")
            
        # Lists
        for lst in content.get("lists", []):
            list_type = lst.get("type", "ul")
            for i, item in enumerate(lst.get("items", [])):
                prefix = f"{i+1}." if list_type == "ol" else "-"
                md_lines.append(f"{prefix} {item}")
            md_lines.append("")
            
        # Images
        images = page_data.get("images", [])
        if images:
            md_lines.append("\n## Images\n")
            for img in images[:10]:  # Limit to first 10 images
                alt = img.get("alt", "Image")
                src = img.get("src", "")
                md_lines.append(f"![{alt}]({src})")
                
        return "\n".join(md_lines)

def main():
    print("Starting Nothing Better Health website scraper...")
    scraper = NBHScraper()
    
    # Crawl the site
    scraper.crawl_site(max_pages=50)  # Adjust max_pages as needed
    
    # Save the data
    scraper.save_data()
    
    print("\nScraping complete! Check the 'scraped_content' directory for results.")
    print("- complete_content.json: All content in structured JSON format")
    print("- pages/: Individual markdown files for each page")
    print("- summary.json: Overview of scraped content")

if __name__ == "__main__":
    main()