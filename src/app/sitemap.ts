import { MetadataRoute } from 'next';
import { ALL_ITEMS } from '@/lib/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.bloxfruitvaluable.com';

  // Static Pages
  const staticPages = [
    '',
    '/values-list',
    '/calculator',
    '/trading',
    '/community',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Item Pages
  const itemPages = ALL_ITEMS.map((item) => ({
    url: `${baseUrl}/item/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const, // Values update constantly
    priority: 0.9,
  }));

  return [...staticPages, ...itemPages];
}
