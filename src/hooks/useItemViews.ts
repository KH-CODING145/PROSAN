import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  incrementItemView, 
  subscribeToItemViews, 
  fetchAllItemViews, 
  calculatePopularityMetric,
  PopularityMetric 
} from '../services/firestoreService';

interface UseItemViewsOptions {
  itemId: string;
  itemType: 'project' | 'article';
  autoIncrement?: boolean;
}

interface UseItemViewsResult {
  views: number;
  isLoading: boolean;
  popularity: PopularityMetric;
  allViewsMap: Record<string, number>;
  incrementManually: () => Promise<void>;
  isLive: boolean;
}

export function useItemViews({
  itemId,
  itemType,
  autoIncrement = false,
}: UseItemViewsOptions): UseItemViewsResult {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allViewsMap, setAllViewsMap] = useState<Record<string, number>>({});
  const [isLive, setIsLive] = useState<boolean>(false);
  const hasIncrementedRef = useRef<boolean>(false);

  // Load global views for comparative popularity benchmarking
  useEffect(() => {
    let isMounted = true;
    fetchAllItemViews()
      .then((records) => {
        if (isMounted && records) {
          setAllViewsMap(records);
        }
      })
      .catch((err) => {
        console.warn('Failed to load global view stats for benchmark:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Increment view on mount if requested
  useEffect(() => {
    if (!autoIncrement || !itemId || hasIncrementedRef.current) return;
    hasIncrementedRef.current = true;

    incrementItemView(itemId, itemType)
      .catch((err) => {
        console.warn('Unable to record view count to Firestore:', err);
      });
  }, [itemId, itemType, autoIncrement]);

  // Real-time Firestore subscription
  useEffect(() => {
    if (!itemId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsubscribe = subscribeToItemViews(
      itemId,
      itemType,
      (data) => {
        setViews(data.views);
        setIsLoading(false);
        setIsLive(true);
      },
      (err) => {
        console.warn('Firestore view subscription error:', err);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [itemId, itemType]);

  const incrementManually = useCallback(async () => {
    try {
      await incrementItemView(itemId, itemType, true);
    } catch (err) {
      console.error('Manual increment failed:', err);
    }
  }, [itemId, itemType]);

  const allNumbers: number[] = Object.values(allViewsMap).map((v) => Number(v)).filter((n) => !isNaN(n));
  const popularity = calculatePopularityMetric(views, allNumbers);

  return {
    views,
    isLoading,
    popularity,
    allViewsMap,
    incrementManually,
    isLive,
  };
}
