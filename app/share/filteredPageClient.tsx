// components/FilterPageClient.tsx
'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import GoodCard from "@/app/share/goodCard";
import CardsPage from "@/app/share/cardsPage";
import { IProduct } from "@/types/interfaces.type";
import "../styles/share/areaInPages.scss";

interface FilterPageClientProps {
  filterType: string;
  title: string;
  subtitle?: string;
}

// Маппинг фильтров
const filterMap: Record<string, (p: IProduct) => boolean> = {
  'discount': (p) => p.isDiscount === true,
  'in-stock': (p) => p.isStock === true,
  'high-rating': (p) => p.rating > 4,
  'lower-price': (p) => p.isLowerPrice === true,
};

const FilterPageClient = ({ filterType, title, subtitle }: FilterPageClientProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  
  const ITEMS_PER_PAGE = 10;

  const fetchProducts = useCallback(async (pageNum: number, isReset = false) => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      const res = await fetch(`/api/products?page=${pageNum}&limit=${ITEMS_PER_PAGE}&filter=${filterType}`);
      const data = await res.json();
      
      if (data.success) {
        if (isReset) {
          setProducts(data.products);
        } else {
          setProducts(prev => {
            const existingIds = new Set(prev.map(p => p._id));
            const newProducts = data.products.filter((p: IProduct) => !existingIds.has(p._id));
            return [...prev, ...newProducts];
          });
        }
        setHasMore(data.hasMore);
        setTotalCount(data.total);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, filterType]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [filterType]);

  useEffect(() => {
    if (!loadingRef.current || !hasMore || loading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchProducts(page + 1, false);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    
    observerRef.current.observe(loadingRef.current);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, page]);

  const productCards = useMemo(() => {
    return products.map((product) => (
      <div key={product._id}>
        <GoodCard
          _id={product._id}
          title={product.title}
          subTitle={product.subTitle}
          image={product.image}
          priceWithoutDiscount={product.priceWithoutDiscount}
          isDiscount={product.isDiscount}
          discount={product.discount}
          isStock={product.isStock}
          doodCount={product.doodCount}
          rating={product.rating}
          isBuyMostOften={product.isBuyMostOften}
          isGreatDeals={product.isGreatDeals}
          isRecommend={product.isRecommend}
        />
      </div>
    ));
  }, [products]);

  return (
    <section className="template-area-sections">
      <div className="area-in-pages">
        
        <CardsPage>
          {productCards}
          
          {hasMore && (
            <div ref={loadingRef} style={{ height: '1px', width: '100%' }} />
          )}
        </CardsPage>
        
        {loading && (
          <div className="loading-indicator">
            <div className="spinner" />
            Загрузка товаров...
          </div>
        )}
        
        {!hasMore && products.length > 0 && (
          <div className="end-message">
            🎉 Вы просмотрели все {totalCount} товаров
          </div>
        )}
        
        {!hasMore && products.length === 0 && (
          <div className="empty-message">
            Нет товаров
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterPageClient;