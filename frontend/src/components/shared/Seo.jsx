import { useEffect } from "react";
import { BUSINESS } from "@/config/business";

// ---------------------------------------------------------------
// Per-page SEO: sets the <title>, meta description, canonical link
// and social-share tags whenever a page loads. Each page renders
// exactly one of these near the top.
// ---------------------------------------------------------------
export default function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    document.title = title;
    const url = BUSINESS.siteUrl + path;

    // Create-or-update a <meta> tag in the document head
    const upsertMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path]);

  return null; // this component only manages the <head>, nothing visual
}
