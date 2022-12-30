/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "via.placeholder.com",
      "placehold.co",
      "cdn.pixabay.com",
    ], // close domains
  }, // close images
}; // close next config

// Export
module.exports = nextConfig;
