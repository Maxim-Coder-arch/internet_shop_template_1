'use client';

import { useState } from "react";
import { websiteData as data } from "@/data/websiteData";
import GoodCard from "@/app/share/goodCard";
import GoodsHeader from "./goodsHeader";
import "../../styles/all-goods/index.scss";
import useSortedStockGoods from "@/hooks/useSortedStockGoods";
import CardsPage from "@/app/share/cardsPage";

const AllGoods = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const getFilteredGoods = () => {
    switch(activeFilter) {
      case "most-often":
        return data.allDoods.cards.filter(good => good.isBuyMostOften);
      case "great-deals":
        return data.allDoods.cards.filter(good => good.isGreatDeals);
      case "recommend":
        return data.allDoods.cards.filter(good => good.isRecommend);
      default:
        return data.allDoods.cards;
    }
  };

  const filteredGoods = useSortedStockGoods(getFilteredGoods());

  return (
    <section id="goods">
      <div className="goods">
        <GoodsHeader 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          goodsHeaderData={data.allDoods.goodsheader}
        />
        <CardsPage>

          {filteredGoods.map((good, index) => (
            <GoodCard
              key={index}
              id={good.id?.toString() || index.toString()}
              title={good.title}
              subTitle={good.subTitle}
              image={good.image}
              priceWithoutDiscount={Number(good.priceWithoutDiscount)}
              isDiscount={good.isDiscount}
              discount={good.discount}
              isStock={good.isStock}
              doodCount={good.doodCount}
              rating={good.rating}
              isBuyMostOften={good.isBuyMostOften}
              isGreatDeals={good.isGreatDeals}
              isRecommend={good.isRecommend}
            />
          ))}
        </CardsPage>
      </div>
    </section>
  );
};

export default AllGoods;