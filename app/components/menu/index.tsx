'use client';

import { websiteData as data } from "@/data/websiteData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles/menu/index.scss";
import ModalSearchMenu from "@/app/widgets/modalSearchMenu";
import { useState } from "react";

const Menu = () => {

  const pathName = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="menu">
      <div className="menu-header">
        <span>{data.menu.companyName}</span>
        <div className={`menu-input ${isModalOpen ? "modal-menu-open" : ""}`}>
          <button className="open-categories" onClick={() => setIsModalOpen(prev => !prev)}>
            <div className="menu-lines">
              {Array.from({length: 3}).map((_, idx) => <div className={`menu-line ${isModalOpen ? `list-item-${idx}` : "" }`} key={idx}></div>)}
            </div>
            Фильтры
          </button>
          <input type="text" name="" id="" placeholder="Поиск" />
          <button className="magnifying"></button>
          {isModalOpen && <ModalSearchMenu />}
        </div>
        <div className="menu-target">
          <Link href="#">{data.menu.targetAction}</Link>
          <Link href="#">{data.menu.consultation}</Link>
        </div>
      </div>
      <div className="menu-options">
        <ul>
          {
            data.menu.categories.map((category, index) => {
              return (
                <Link href={category.link} key={index}>
                  <li className={pathName === category.link ? "item-active" : ""}>{category.category}</li>
                </Link>
              )
            })
          }
        </ul>
      </div>
    </nav>
  )
}

export default Menu;