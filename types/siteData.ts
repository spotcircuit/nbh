export interface SiteData {
  pages?: Record<string, PageData>
  metadata?: Record<string, any>
}

export interface PageData {
  title?: string
  content?: string
  images?: string[]
  metadata?: Record<string, any>
}
