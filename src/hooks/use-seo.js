import { useEffect } from "react";

/**
 * A custom hook to dynamically update page SEO metadata: title, description,
 * keywords, canonical URL, Open Graph, and Twitter tags.
 *
 * @param {Object} seoOptions
 * @param {string} seoOptions.title Page title
 * @param {string} seoOptions.description Page description
 * @param {string} [seoOptions.keywords] Comma-separated list of keywords
 * @param {string} [seoOptions.canonicalPath] Path portion of canonical URL (e.g., '/projects')
 * @param {string} [seoOptions.ogType] Open Graph type (defaults to 'website')
 */
export function useSEO({ title, description, keywords, canonicalPath, ogType = "website" }) {
  useEffect(() => {
    // 1. Update document title
    if (title) {
      document.title = title;
    }

    // Helper function to find or create a meta tag
    const updateMetaTag = (selector, attribute, value) => {
      if (!value) return;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        // Extract attribute key & value from selector, e.g., name="description"
        const match = selector.match(/\[(name|property)="(.+?)"\]/);
        if (match) {
          element.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // 2. Update descriptions (Primary, OG, Twitter)
    updateMetaTag('meta[name="description"]', "content", description);
    updateMetaTag('meta[property="og:description"]', "content", description);
    updateMetaTag('meta[name="twitter:description"]', "content", description);

    // 3. Update keywords
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', "content", keywords);
    }

    // 4. Update titles (OG, Twitter)
    updateMetaTag('meta[property="og:title"]', "content", title);
    updateMetaTag('meta[name="twitter:title"]', "content", title);

    // 5. Update Open Graph type
    updateMetaTag('meta[property="og:type"]', "content", ogType);

    // 6. Update URL & Canonical Link
    const domain = "https://sunilgehlot.dev";
    // Normalize path format
    const formattedPath = canonicalPath 
      ? (canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`)
      : "";
    const fullUrl = `${domain}${formattedPath}`;

    updateMetaTag('meta[property="og:url"]', "content", fullUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", fullUrl);
  }, [title, description, keywords, canonicalPath, ogType]);
}
