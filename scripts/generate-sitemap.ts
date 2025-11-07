const fs = require("fs");
const path = require("path");
// const fetch = require("node-fetch"); // Only needed if using ts-node directly and no global fetch

const baseUrl = "https://properties.rjbworld.org";

const publicStaticPaths = [
  "",
  "/about",
  "/blogs",
  "/investment",
  "/whitepaper",
];

const excludedPaths = [
  "/admin/add-blog",
  "/admin/add-category",
  "/admin/add-product",
  "/search",
  "/login",
  "/checkout",
  "/sign-up",
  "/cart",
  "/orders",
];

const today = new Date().toISOString();

async function getSlugs(url: string): Promise<string[]> {
  const res = await fetch(url);
  const json = await res.json();

  // If the response is an array directly (like your blogs API)
  if (Array.isArray(json)) {
    return json.map((item: any) => item.slug);
  }

  // If the response has { success, data }
  if (json.success && Array.isArray(json.data)) {
    return json.data.map((item: any) => item.slug);
  }

  throw new Error(`Unexpected response format from ${url}`);
}

async function generateSitemap() {
  try {
    const [propertySlugs, blogSlugs] = await Promise.all([
      getSlugs(`${baseUrl}/api/properties`),
      getSlugs(`${baseUrl}/api/blogs`),
    ]);

    const staticUrls = publicStaticPaths
      .filter((url) => !excludedPaths.includes(url))
      .map(
        (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
      )
      .join("");

    const propertyUrls = propertySlugs
      .map(
        (slug) => `
  <url>
    <loc>${baseUrl}/properties/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
      )
      .join("");
    const blogUrls = blogSlugs
      .map(
        (slug) => `
  <url>
    <loc>${baseUrl}/blogs/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${staticUrls}
${propertyUrls}
${blogUrls}

</urlset>`;

    fs.writeFileSync(
      path.join(process.cwd(), "public", "sitemap.xml"),
      sitemap.trim()
    );

    console.log("✅ Sitemap generated with dynamic slugs!");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
  }
}

generateSitemap();
