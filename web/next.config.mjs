/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [{ source: "/", destination: "/profile", permanent: false }];
  },
};

export default nextConfig;
