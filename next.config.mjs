// next.config.mjs
import nextPwa from "next-pwa";

const withPwa = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // Your custom Next.js config options (if any)
};

export default withPwa(nextConfig);
