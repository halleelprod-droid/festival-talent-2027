import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },

    sitemap:
      'https://festivaltalent2027.com/sitemap.xml'
  };
}