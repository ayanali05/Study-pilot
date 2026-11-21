import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://study-pilot.vercel.app';
  const routes = [
    '',
    '/coach',
    '/predictor',
    '/plan',
    '/flashcards',
    '/report',
    '/tests',
    '/roadmap',
    '/pyq',
    '/recommendations',
    '/what-if',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
