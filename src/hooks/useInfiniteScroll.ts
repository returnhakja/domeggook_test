import { useEffect, type RefObject } from 'react';

type Options = {
  threshold?: number;
};

export function useInfiniteScroll(
  sentinelRef: RefObject<HTMLElement | null>,
  loadMore: () => void | Promise<void>,
  { threshold = 0.1 }: Options = {},
) {
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { threshold },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelRef, loadMore, threshold]);
}
