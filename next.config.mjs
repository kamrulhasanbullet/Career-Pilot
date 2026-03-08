/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google login
      "thelenslounge.com", // Credentials DB photoUrl
      "avatars.githubusercontent.com", // GitHub
      "res.cloudinary.com", // Cloudinary
      "cdn.sanity.io", // Sanity CMS
      "images.unsplash.com", // Unsplash
      "example.com", // Company domain
      "media.istockphoto.com", // iStock image causing this error
      "i.sstatic.net", // Stack Exchange image CDN: cross-origin restrictions apply
      "encrypted-tbn0.gstatic.com", // Google Thumbnail cache: encrypted proxy, not embeddable
    ],
  },
};

export default nextConfig;
