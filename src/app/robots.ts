import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/api/auth/'],
    },
    sitemap: 'https://www.bloxfruitvaluable.com/sitemap.xml',
  };
}
