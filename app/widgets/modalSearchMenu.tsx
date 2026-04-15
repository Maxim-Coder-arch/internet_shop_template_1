// components/ModalSearchMenu.tsx
'use client';

import { motion } from "framer-motion";
import { modalFilters } from "@/data/modalFilters.data";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import LittleGoodCard from "../share/littleGoodCard";
import { IProduct } from "@/types/interfaces.type";
import "../styles/widgets/modalSearchMenu.scss";

interface IModalSearchMenuProps {
  searchQuery: string;
  onClose: () => void;
}

const ModalSearchMenu = ({ searchQuery, onClose }: IModalSearchMenuProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  
  const ITEMS_PER_PAGE = 10;

  // Поиск товаров с пагинацией
  const fetchSearchResults = useCallback(async (pageNum: number, isReset = false) => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&page=${pageNum}&limit=${ITEMS_PER_PAGE}`);
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
        setTotal(data.total);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Ошибка поиска:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, loading]);

  // Первый поиск при изменении запроса
  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setHasMore(false);
      return;
    }
    
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchSearchResults(1, true);
  }, [searchQuery]);

  // Observer для подгрузки следующих страниц
  useEffect(() => {
    if (!loadingRef.current || !hasMore || loading || !searchQuery.trim()) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchSearchResults(page + 1, false);
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
  }, [loading, hasMore, page, searchQuery]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto", maxHeight: "650px" }}
      exit={{ opacity: 0, height: 0 }}
      className="modal-menu-filteres"
    >
      <div className="modal-search-sidebar">
        <ul>
          {modalFilters.map((filter, index) => (
            <Link key={index} href={filter.link} onClick={handleLinkClick}>
              <li>{filter.label}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="modal-search-goods">
        {searchQuery && (
          <div className="search-results-header">
            Результаты поиска по запросу: <strong>{searchQuery}</strong>
            {total > 0 && <span className="search-results-count"> ({total})</span>}
          </div>
        )}
        
        {!searchQuery.trim() ? (
          <div className="search-placeholder">
            Введите запрос для поиска
          </div>
        ) : loading && products.length === 0 ? (
          <div className="search-loading">Поиск...</div>
        ) : products.length === 0 ? (
          <div className="search-no-results">
            Ничего не найдено 😔
          </div>
        ) : (
          <>
            {products.map((product) => (
              <LittleGoodCard 
                key={product._id} 
                product={product} 
                onClick={handleLinkClick}
              />
            ))}
            
            {hasMore && (
              <div ref={loadingRef} style={{ height: '20px', width: '100%' }} />
            )}
            
            {loading && products.length > 0 && (
              <div className="search-loading-more">Загрузка ещё...</div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ModalSearchMenu;