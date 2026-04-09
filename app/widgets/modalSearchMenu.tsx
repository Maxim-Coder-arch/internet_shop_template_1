'use client';

import { motion } from "framer-motion";
import { modalFilters } from "@/data/modalFilters.data";
import Link from "next/link";
import { products } from "@/data/prroducts.data";
import LittleGoodCard from "../share/littleGoodCard";
import "../styles/widgets/modalSearchMenu.scss";

const ModalSearchMenu = ({ searchQuery, onClose }) => {
  
  // Фильтрация товаров по поисковому запросу
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLinkClick = () => {
    onClose(); // закрываем модалку после выбора фильтра или товара
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
            Результаты поиска по запросу: "{searchQuery}"
          </div>
        )}
        
        {filteredProducts.length === 0 && searchQuery ? (
          <div className="search-no-results">
            Ничего не найдено 😔
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <LittleGoodCard 
              key={index} 
              product={product} 
              onClick={handleLinkClick}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ModalSearchMenu;