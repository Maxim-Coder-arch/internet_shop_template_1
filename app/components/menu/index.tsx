'use client';

import { websiteData as data } from "@/data/websiteData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles/menu/index.scss";
import ModalSearchMenu from "@/app/widgets/modalSearchMenu";
import { useState, useRef, useEffect, useCallback } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import BackdropBlur from "@/app/share/backdropBlur";

const Menu = () => {
  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBottomPanel, setShowBottomPanel] = useState(false);
  const scrollDIrection = useScrollDirection(10);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Вычисляем есть ли реальный текст (не пробелы)
  const hasValidText = searchQuery.trim().length > 0;

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowBottomPanel(scrollDIrection === "down");
  }, [scrollDIrection]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
    <nav className={`menu ${isScroll ? "window-scroll-effect" : ""}`}>
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
            onChange={handleInputChange}
            onFocus={handleSearchFocus}
          />
          <button className="magnifying" onClick={() => setIsModalOpen(true)} />
          
          {isModalOpen && (
            <ModalSearchMenu 
              searchQuery={searchQuery}
              onClose={handleCloseModal}
              change={hasValidText}
              ignoreRef={buttonRef}
            />
          )}
        </div>
        <div className="menu-target">
          <Link href="#">{data.menu.targetAction}</Link>
          <Link href="#">{data.menu.consultation}</Link>
        </div>
      </div>
      
      <div className={`menu-options ${!showBottomPanel ? "" : "menu-options-hidden"}`}>
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
    {<BackdropBlur isOPen={isModalOpen} />}
    </>
  );
};

export default Menu;