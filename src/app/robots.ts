import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://govtexam-ai.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Allow AI Answer Engines (Perplexity, ChatGPT, Claude, Gemini)
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "cohere-ai",
          "Amazonbot"
        ],
        allow: ["/", "/eligibility", "/jobs/*", "/llms.txt"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
