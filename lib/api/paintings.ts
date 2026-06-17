import paintingsData from '@/public/paintings/paintings.json';
import type { Painting, Review } from '@/types';

export async function getPaintings(): Promise<Painting[]> {
  return paintingsData as Painting[];
}

export async function getPaintingBySlug(slug: string): Promise<Painting | null> {
  const painting = paintingsData.find((p) => p.slug === slug);
  return painting ? (painting as Painting) : null;
}

export async function getPaintingById(id: number): Promise<Painting | null> {
  const painting = paintingsData.find((p) => p.id === id);
  return painting ? (painting as Painting) : null;
}

export async function getFeaturedPaintings(): Promise<Painting[]> {
  return paintingsData.filter((p) => p.featured) as Painting[];
}

export async function getTrendingPaintings(): Promise<Painting[]> {
  return paintingsData.filter((p) => p.trending) as Painting[];
}

export async function getPaintingsByCategory(category: string): Promise<Painting[]> {
  if (category === 'all') return paintingsData as Painting[];
  return paintingsData.filter((p) => p.category.toLowerCase() === category.toLowerCase()) as Painting[];
}

export async function searchPaintings(query: string): Promise<Painting[]> {
  const lowerQuery = query.toLowerCase();
  return paintingsData.filter(
    (p) =>
      p.title_en.toLowerCase().includes(lowerQuery) ||
      p.title_hi.includes(query) ||
      p.description_en.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  ) as Painting[];
}

export function getUniqueCategories(): { name: string; count: number }[] {
  const categories: Record<string, number> = {};
  paintingsData.forEach((p) => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  return Object.entries(categories).map(([name, count]) => ({ name, count }));
}

export function getPriceRange(): { min: number; max: number } {
  const prices = paintingsData.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export async function getRelatedPaintings(paintingId: number, limit = 4): Promise<Painting[]> {
  const currentPainting = paintingsData.find((p) => p.id === paintingId);
  if (!currentPainting) return [];

  const related = paintingsData
    .filter((p) => p.id !== paintingId)
    .filter((p) => p.category === currentPainting.category || p.tags.some((t) => currentPainting.tags.includes(t)))
    .slice(0, limit);

  return related as Painting[];
}
