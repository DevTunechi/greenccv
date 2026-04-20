import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://greenccv.io', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://greenccv.io/privacy', lastModified: new Date(), priority: 0.5 },
    { url: 'https://greenccv.io/terms', lastModified: new Date(), priority: 0.5 },
  ];
}