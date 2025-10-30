import { useEffect } from "react";

type SeoProps = {
  title: string;
  description?: string;
  canonicalPath?: string;
  imagePath?: string;
  noindex?: boolean;
};

export function Seo({
  title,
  description = "Discover, create, and manage events with Eventify by Zaiid Moumni (TheVlpha).",
  canonicalPath = "/",
  imagePath = "/favicon.png",
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title}` : "Eventify";

    const ensureMeta = (name: string, attr: "name" | "property" = "name") => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      return el;
    };

    ensureMeta("description").setAttribute("content", description);
    ensureMeta("robots").setAttribute("content", noindex ? "noindex, nofollow" : "index, follow");

    // Open Graph
    ensureMeta("og:title", "property").setAttribute("content", title || "Eventify");
    ensureMeta("og:description", "property").setAttribute("content", description);
    ensureMeta("og:type", "property").setAttribute("content", "website");
    ensureMeta("og:site_name", "property").setAttribute("content", "Eventify");
    ensureMeta("og:image", "property").setAttribute("content", imagePath);

    // Twitter
    ensureMeta("twitter:card").setAttribute("content", "summary_large_image");
    ensureMeta("twitter:title").setAttribute("content", title || "Eventify");
    ensureMeta("twitter:description").setAttribute("content", description);
    ensureMeta("twitter:image").setAttribute("content", imagePath);

    // Canonical
    let canonical = document.head.querySelector<HTMLLinkElement>("link[rel=canonical]");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalPath);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, canonicalPath, imagePath, noindex]);

  return null;
}

export default Seo;


