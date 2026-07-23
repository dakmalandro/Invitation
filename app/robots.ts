import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // link-preview crawlers for the platforms this is actually shared
        // through — WhatsApp and Instagram both run their own crawler UA
        // distinct from Facebook's, even though all three are Meta products
        userAgent: [
          "facebookexternalhit",
          "Facebot",
          "Twitterbot",
          "WhatsApp",
          "Instagram",
        ],
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
