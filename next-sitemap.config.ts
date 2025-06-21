import { fetchSlugs } from "./scripts/fetchSlugs";

const config = {
  siteUrl: "https://store.rjbworld.org",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  additionalPaths: async () => {
    const { productUrls, blogUrls } = await fetchSlugs();
    return [...productUrls, ...blogUrls];
  },
};

export default config;
