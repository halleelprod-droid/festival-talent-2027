import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:
        'https://festivaltalent2027.com',

      lastModified:
        new Date(),

      changeFrequency:
        'weekly',

      priority: 1
    },

    {
      url:
        'https://festivaltalent2027.com/programme',

      lastModified:
        new Date(),

      changeFrequency:
        'weekly',

      priority: 0.9
    },

    {
      url:
        'https://festivaltalent2027.com/artists',

      lastModified:
        new Date(),

      changeFrequency:
        'weekly',

      priority: 0.8
    },

    {
      url:
        'https://festivaltalent2027.com/partners',

      lastModified:
        new Date(),

      changeFrequency:
        'monthly',

      priority: 0.7
    }
  ];
}