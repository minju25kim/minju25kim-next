// src/hooks/useContentQuery.ts
// React Query hook for fetching content by category and slug from /api/get-content
import { useQuery } from '@tanstack/react-query';

export function useContentQuery(category: string, slug: string, options = {}) {
  return useQuery({
    queryKey: ['content', category, slug],
    queryFn: async () => {
      if (!category || !slug) throw new Error('Missing required parameters');
      const res = await fetch(`/api/get-content?category=${encodeURIComponent(category)}&slug=${encodeURIComponent(slug)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch content');
      return data;
    },
    enabled: !!category && !!slug,
    ...options,
  });
} 