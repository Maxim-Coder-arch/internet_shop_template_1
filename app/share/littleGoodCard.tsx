import Image from "next/image";
import "../styles/share/littleGoodCard.scss";
import Link from "next/link";
import { usePriceDiscount } from "@/hooks/usePriceDiscount";
import { IProduct } from "@/types/interfaces.type";

interface LittleGoodCardProps {
  product: IProduct;
  onClick?: () => void;
}

const LittleGoodCard = ({ product, onClick }: LittleGoodCardProps) => {
  const priceWithDiscount = usePriceDiscount(
    product.isDiscount, 
    Number(product.priceWithoutDiscount), 
    product.discount
  );

  return (
    <div className={`little-good-card ${product.isStock ? "" : "no-stock"}`}>
      <div className="little-good-image-wrapper">
        <Image 
          src={product.image} 
          alt={product.title} 
          width={300} 
          height={300} 
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </div>
      <div className="little-card-meta">
        <h3>{product.title}</h3>
        <p>{product.subTitle}</p>
      </div>

      <div className="little-card-footer">
        <div className="little-card-price">
          {product.isDiscount ? (
            <div className="little-good-card-price-discount">
              <span>{priceWithDiscount} ₽</span>
              <div className="little-card-discount">-{product.discount}</div>
            </div>
          ) : (
            <span className="little-default-price">{product.priceWithoutDiscount} ₽</span>
          )}
        </div>
        <Link href={`/pages/product/${product._id}`} onClick={onClick}>
          {product.isStock ? "Заказать" : "Нет в наличии"}
        </Link>
      </div>
    </div>
  );
};

export default LittleGoodCard;