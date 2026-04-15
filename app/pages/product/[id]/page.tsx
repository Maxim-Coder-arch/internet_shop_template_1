// app/product/[id]/page.tsx
'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import ModalDescription from "@/app/share/modalFullDescriptionProduct";
import ModalGallery from "@/app/share/modalProductGallery";
import OrderProductModal from "@/app/share/orderProductModal";
import { usePriceDiscount } from "@/hooks/usePriceDiscount";
import { IProduct } from "@/types/interfaces.type";
import "../../../styles/share/areaInPages.scss";
import "../../../styles/product/index.scss";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Загружаем товар из API
  useEffect(() => {
    if (!params.id) return;
    
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Ошибка загрузки товара:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [params.id]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!product) return <div className="not-found">Товар не найден</div>;

  const allImages = [product.image, ...(product.addititionalImage || [])];
  const activeImage = allImages[activeImageIndex];
  const priceGoodWithDiscount = usePriceDiscount(
    product.isDiscount, 
    Number(product.priceWithoutDiscount), 
    product.discount
  );

  return (
    <section id="product">
      <div className="area-in-pages">
        <div className="page-card-info">
          <div className="page-card">
            
            {/* Миниатюры */}
            <div className="page-card-images">
              {allImages.map((img, idx) => (
                <button 
                  key={idx}
                  className={idx === activeImageIndex ? 'active' : ''}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <Image src={img || ""} alt={product.title} width={100} height={100} />
                </button>
              ))}
            </div>

            {/* Основное изображение */}
            <div className="page-card-full-image">
              <Image src={activeImage || ""} alt={product.title} width={500} height={500} />
              <button 
                className="zoom-icon"
                onClick={() => setIsGalleryOpen(true)}
                aria-label="Увеличить"
              >
                <Image src="/icons/magnifying-glass.png" alt="Увеличить" width={20} height={20} />
              </button>
            </div>

            {/* Информация о товаре */}
            <div className="card-page-body">
              <div className="card-page-body-meta-data">
                <h1>{product.title}</h1>
                <p>{product.subTitle}</p>
                
                <div className="card-page-body-full-description">
                  <button onClick={() => setIsModalOpen(true)}>Смотреть полное описание</button>
                  <span>{product.fullDescription.slice(0, 300)}...</span>
                </div>

                <div className="card-page-body-price">
                  {product.isDiscount ? (
                    <>
                      <span className="card-page-body-price-with-discount">
                        {priceGoodWithDiscount} ₽
                      </span>
                      <span className="card-page-body-price-discount">
                        Скидка {product.discount}
                      </span>
                      <span className="card-page-body-price-without-discount">
                        Старая цена <mark>{product.priceWithoutDiscount} ₽</mark>
                      </span>
                    </>
                  ) : (
                    <span className="card-page-body-price-without-discount price-condition">
                      Цена <mark>{product.priceWithoutDiscount} ₽</mark>
                    </span>
                  )}
                </div>

                <div className="card-page-additional-information">
                  {product.isStock ? (
                    <div className="card-page-additional-information__is-stock">
                      В наличии {product.doodCount}
                    </div>
                  ) : (
                    <div className="card-page-additional-information__not-in-stock">
                      Нет в наличии
                    </div>
                  )}
                  <div className="card-page-additional-information__rating">
                    Рейтинг: {product.rating}
                  </div>
                  {product.isLowerPrice && <div className="card-page-additional-information__lower-price">Низкая цена</div>}
                  {product.isBuyMostOften && <div className="card-page-additional-information__buy-most-often">Часто покупают</div>}
                  {product.isGreatDeals && <div className="card-page-additional-information__great-deals">Выгодное предложение</div>}
                  {product.isRecommend && <div className="card-page-additional-information__recommend">Рекомендуемые</div>}
                </div>
              </div>
              
              <div className="page-card-order">
                <button onClick={() => setIsOrderModalOpen(true)}>Заказать</button>
                Или
                <a href="tel:891256327634">Узнать подробности</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalDescription 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Описание: ${product.title}`}
        description={product.fullDescription}
      />

      <ModalGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={allImages}
        initialIndex={activeImageIndex}
        title={product.title}
      />

      <OrderProductModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
        price={priceGoodWithDiscount || product.priceWithoutDiscount}
      />
    </section>
  );
};

export default Product;