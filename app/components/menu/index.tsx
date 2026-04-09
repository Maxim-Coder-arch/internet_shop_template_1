'use client';

import { websiteData as data } from "@/data/websiteData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles/menu/index.scss";
import ModalSearchMenu from "@/app/widgets/modalSearchMenu";
import { useState, useRef, useEffect } from "react";

const Menu = () => {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSearchFocus = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchQuery("");
  };

  return (
    <nav className="menu">
      <div className="menu-header">
        <span>{data.menu.companyName}</span>
        
        <div className={`menu-input ${isModalOpen ? "modal-menu-open" : ""}`}>
          <button 
            className="open-categories" 
            onClick={() => setIsModalOpen(prev => !prev)}
          >
            <div className="menu-lines">
              {Array.from({length: 3}).map((_, idx) => (
                <div className={`menu-line ${isModalOpen ? `list-item-${idx}` : ""}`} key={idx} />
              ))}
            </div>
            Фильтры
          </button>
          
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Поиск" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
          />
          <button className="magnifying" onClick={() => setIsModalOpen(true)} />
          
          {isModalOpen && (
            <ModalSearchMenu 
              searchQuery={searchQuery}
              onClose={handleCloseModal}
            />
          )}
        </div>
        
        <div className="menu-target">
          <Link href="#">{data.menu.targetAction}</Link>
          <Link href="#">{data.menu.consultation}</Link>
        </div>
      </div>
      
      <div className="menu-options">
        <ul>
          {data.menu.categories.map((category, index) => (
            <Link href={category.link} key={index}>
              <li className={pathName === category.link ? "item-active" : ""}>
                {category.category}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;