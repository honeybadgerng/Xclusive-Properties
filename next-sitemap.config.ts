import { fetchSlugs } from "./scripts/fetchSlugs";

const config = {
  siteUrl: "https://properties.rjbworld.org",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  additionalPaths: async () => {
    const { propertyUrls } = await fetchSlugs();
    return [...propertyUrls];
  },
};

export default config;
