import { useRef, useState } from 'react';
import "./ProductListPage.css";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useProductStore } from "../../store/productStore";
import Header from "../Header/Header";
import FilterBar from "../FilterBar/FilterBar";
import ProductItem from "../ProductItem/ProductItem";
import FilterSheet from "../FilterSheet/FilterSheet";
import LoadingCenter from "./LoadingCenter";

export default function ProductListPage() {
  const { items, header, loading, loadingMore, hasMore, error, fetchProducts, loadMore } = useProductStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll(sentinelRef, loadMore);

  const handleFilterSearch = (keyword: string) => {
    if (keyword) fetchProducts({ kw: keyword });
  };

  return (
    <div className="product-list-page">
      <Header />
      <FilterBar
        totalCount={header?.numberOfItems ?? 0}
        onFilterClick={() => setIsFilterOpen(true)}
      />
      {loading && <LoadingCenter />}
      {error && (
        <p className="product-list__status product-list__status--error">
          {error}
        </p>
      )}
      {!loading && !error && items.length === 0 && (
        <div className="product-list__empty">
          <p>검색된 상품이 존재하지 않습니다.</p>
        </div>
      )}
      <div className="product-list">
        {items.map((item) => (
          <ProductItem key={item.no} item={item} />
        ))}
      </div>
      <div ref={sentinelRef} className="product-list__sentinel" />
      {loadingMore && <LoadingCenter />}
      {!hasMore && items.length > 0 && (
        <p className="product-list__status">마지막 상품입니다.</p>
      )}
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSearch={handleFilterSearch}
      />
    </div>
  );
}
