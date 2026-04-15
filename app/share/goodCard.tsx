import Link from "next/link";
import Image from "next/image";
import "../styles/share/goodCard.scss";
import { usePriceDiscount } from "@/hooks/usePriceDiscount";
import { IProduct } from "@/types/interfaces.type";
import { memo } from "react";

const GoodCard = ({
  _id,
  title,
  subTitle,
  image,
  priceWithoutDiscount,
  isDiscount,
  discount,
  isStock,
  doodCount,
  rating,
  isBuyMostOften,
  isGreatDeals,
  isRecommend,
}: IProduct) => {

  const priceGoodWithDiscount = usePriceDiscount(isDiscount, Number(priceWithoutDiscount), discount);


  return (
    <div className={`good-card ${isStock ? "" : "no-stock"}`}>
      <div className="good-card-header">
        <span className="good-rating">Рейтинг: {rating.toFixed(1)}</span>
        {isBuyMostOften && (
          <span className="buy-most-often-badge">Покупают чаще всего</span>
        )}
        {isBuyMostOften && (
          <span className="buy-most-often-badge">Покупают чаще всего</span>
        )}
        {isGreatDeals && (
          <span className="buy-most-often-badge">Выгодные предложения</span>
        )}
        {isRecommend && (
          <span className="buy-most-often-badge">Рекомендуемые</span>
        )}
      </div>
      
      <div className="good-card-image">
        <Image 
          src={image} 
          alt={`${title} - ${subTitle}`} 
          width={400} 
          height={300} 

        />
      </div>
      
      <div className="good-card-info">
        <div className="good-card-meta">
          <p>{subTitle}</p>
          <h3>{title}</h3>
          {isStock ? (
            <span className="stock-badge">В наличии {doodCount} шт.</span>
          ) : (
            <span className="stock-badge">Нет в наличии</span>
          )}
        </div>
      </div>
      
      <div className="good-card-body">
        <div className="good-card-target">
          <div className="good-price">
            {isDiscount ? (
              <>
                <div className="good-discount-price-block">
                  <span className="new-price">{priceGoodWithDiscount} ₽</span>
                  <span className="discount-badge">-{discount}</span>
                </div>
                <span className="price-old">{priceWithoutDiscount} ₽</span>
              </>
            ) : (
              <span className="usually-price">{priceWithoutDiscount} ₽</span>
            )}
          </div>
          
          <Link 
            href={`/pages/product/${_id}`} className="order-good">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GoodCard;