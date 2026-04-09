# The Ultimate Website Launch Guide: Do's & Don'ts

This guide serves as a technical and SEO checklist to ensure 100% optimization for every new website launch. It is based on the professional standards implemented for the Scrap Silver Calculator project.

---

## Phase 1: Performance & Speed (The Foundation)
A slow site is a dead site. Google uses speed as a ranking factor (Core Web Vitals).

*   **[DO] Use `defer` for Scripts**: Never load JavaScript in a way that blocks the page rendering. Adding `defer` allows the browser to show the page content while scripts download in the background.
*   **[DO] Preconnect Font CDNs**: If using Google Fonts, add `<link rel="preconnect">` to the head. This establishes a server handshake early and saves ~500ms of handshake time.
*   **[DON'T] Use @import in CSS**: Importing fonts inside a CSS file creates a "request chain" that delays the first paint. Always use `<link>` tags in the HTML `<head>` instead.
*   **[DO] Compress Images**: Use modern formats like WebP. Large images are the leading cause of poor performance scores.

## Phase 2: Technical SEO & Integrity
The core rules for search engines and site architecture.

*   **[DO] Pick ONE Primary Domain**: Decide on **WWW** or **non-WWW** immediately and stick to it. Redirect the other version with a permanent 301/308 redirect in your hosting panel (e.g., Vercel).
*   **[DO] Use Canonical Tags**: Every page must have a `<link rel="canonical" href="...">`. This prevents "Duplicate Content" penalties if the same page is accessed via multiple URLs.
*   **[DO] Clean URLs**: Modern SEO favors extension-less URLs (e.g., `/about` instead of `/about.html`). Use hosting configurations (like Vercel's `cleanUrls: true`) to enforce this.
*   **[DO] Sitemap & Robots.txt**: Maintain a `/sitemap.xml` for discovery and a `/robots.txt` to tell bots which parts of the site to ignore.

## Phase 3: Content & Quality (E-E-A-T)
Focus on "Experience, Expertise, Authoritativeness, and Trust."

*   **[DO] Avoid "Thin Content"**: Ensure every page has at least 500-1000 words of unique, helpful content. Avoid generic filler text.
*   **[DO] FAQ Schema**: Use JSON-LD structured data for FAQs. This allows your questions to appear directly in Google search results (Rich Snippets).
*   **[DO] Internal Linking**: Ensure your main pages are searchable and well-linked. Use a shared header/footer for consistent sitewide navigation.

## Phase 4: Final Verification Checklist
Before you push to production, check these 5 items:

1.  **Canonical Audit**: Does every page point to the correct, standardized domain?
2.  **Breadcrumb Audit**: Are the navigation paths logical, localized, and clickable?
3.  **Local vs Prod Audit**: Did I remove all `127.0.0.1` or `localhost` links?
4.  **Schema Audit**: Is the FAQ Schema valid? Test it with the [Schema Markup Validator](https://validator.schema.org/).
5.  **Redirect Audit**: Does the "wrong" domain redirect correctly to the primary one?

---
*Created by Antigravity—April 2026*
