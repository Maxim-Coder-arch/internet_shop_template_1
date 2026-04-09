import Image from "next/image";
import "../styles/share/littleGoodCard.scss";
import { IDoods } from "@/data/websiteData";
import Link from "next/link";

const LittleGoodCard = ({ product }: { product: IDoods }) => {
  const priceWithDiscount = product.isDiscount 
    ? Math.floor(product.priceWithoutDiscount - (product.priceWithoutDiscount * parseInt(product.discount)) / 100)
    : null;

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
        <Link href={`/pages/product/${product.id}`}>
          {product.isStock ? "Заказать" : "Нет в наличии"}
        </Link>
      </div>
    </div>
  );
};

export default LittleGoodCard;