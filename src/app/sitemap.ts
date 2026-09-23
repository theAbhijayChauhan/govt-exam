import { MetadataRoute } from "next";
import { GOVT_JOBS } from "@/data/jobs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://govtexam-ai.vercel.app";
  const currentDate = new Date();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/eligibility`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
  ];

  // Dynamic Job Detail Routes
  const jobRoutes: MetadataRoute.Sitemap = GOVT_JOBS.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: new Date(job.applicationStartDate),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [...staticRoutes, ...jobRoutes];
}
