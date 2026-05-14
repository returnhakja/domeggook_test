import { create } from 'zustand';
import { DEFAULT_SEARCH_KEYWORD } from '../constants/defaultSearch';
import type { FetchProductsParams, ProductItem, ProductListHeader } from '../types/product';
import { fetchProductList } from '../api/productApi';

interface ProductStore {
  items: ProductItem[];
  header: ProductListHeader | null;
  currentPage: number;
  hasMore: boolean;
  currentParams: FetchProductsParams | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  fetchProducts: (params: FetchProductsParams) => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  items: [],
  header: null,
  currentPage: 1,
  hasMore: false,
  currentParams: null,
  loading: false,
  loadingMore: false,
  error: null,

  fetchProducts: async (params) => {
    set({ loading: true, error: null, items: [], currentPage: 1, hasMore: false });
    try {
      const data = await fetchProductList({ ...params, pg: 1 });
      const { header, list } = data.domeggook;
      set({
        items: list.item,
        header,
        currentPage: 1,
        hasMore: header.currentPage < header.numberOfPages,
        currentParams: params,
        loading: false,
      });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  loadMore: async () => {
    const { loading, loadingMore, hasMore, currentPage, currentParams } = get();
    if (loading || loadingMore || !hasMore || !currentParams) return;

    const nextPage = currentPage + 1;
    set({ loadingMore: true });
    try {
      const data = await fetchProductList({ ...currentParams, pg: nextPage });
      const { header, list } = data.domeggook;
      set((state) => ({
        items: [...state.items, ...list.item],
        header,
        currentPage: nextPage,
        hasMore: nextPage < header.numberOfPages,
        loadingMore: false,
      }));
    } catch (e) {
      set({ error: (e as Error).message, loadingMore: false });
    }
  },
}));

useProductStore.getState().fetchProducts({ kw: DEFAULT_SEARCH_KEYWORD });
