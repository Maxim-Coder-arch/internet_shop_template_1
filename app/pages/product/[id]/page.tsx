'use client';

import "../../../styles/share/areaInPages.scss";
import "../../../styles/product/index.scss";
import { products } from "@/data/prroducts.data";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import ModalDescription from "@/app/share/modalFullDescriptionProduct";
import ModalGallery from "@/app/share/modalProductGallery";
import OrderProductModal from "@/app/share/orderProductModal";

const Product = () => {
  const params = useParams();
  const data = products.find(product => product.id === Number(params.id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const allImages = [data?.image, ...(data?.addititionalImage || [])];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = allImages[activeImageIndex];

  if (!data) return <div>Продукт не найден</div>;

  const priceGoodWithDiscount = data.isDiscount 
    ? Math.floor(data.priceWithoutDiscount - (data.priceWithoutDiscount * parseInt(data.discount)) / 100)
    : null;

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
                  <Image src={img} alt={data.title} width={100} height={100} />
                </button>
              ))}
            </div>

            {/* Большое изображение с лупой */}
            <div className="page-card-full-image">
              <Image src={activeImage} alt={data.title} width={500} height={500} />
              <button 
                className="zoom-icon"
                onClick={() => setIsGalleryOpen(true)}
                aria-label="Увеличить"
              >
                <Image src="/icons/magnifying-glass.png" alt="Увеличить" width={20} height={20} />
              </button>
            </div>

            <div className="card-page-body">
              <div className="card-page-body-meta-data">
                <h1>{data.title}</h1>
                <p>{data.subTitle}</p>
                
                <div className="card-page-body-full-description">
                  <button onClick={() => setIsModalOpen(true)}>Смотреть полное описание</button>
                  <span>{data.fullDescription.slice(0, 300)}...</span>
                </div>

                <div className="card-page-body-price">
                  {data.isDiscount ? (
                    <>
                      <span className="card-page-body-price-with-discount">
                        {priceGoodWithDiscount} ₽
                      </span>
                      <span className="card-page-body-price-discount">
                        Скидка {data.discount}
                      </span>
                      <span className="card-page-body-price-without-discount">
                        Старая цена <mark>{data.priceWithoutDiscount} ₽</mark>
                      </span>
                    </>
                  ) : (
                    <span className="card-page-body-price-without-discount price-condition">
                      Цена <mark>{data.priceWithoutDiscount} ₽</mark>
                    </span>
                  )}
                </div>

                <div className="card-page-additional-information">
                  {data.isStock ? (
                    <div className="card-page-additional-information__is-stock card-page-additional-information__page_template">
                      В наличии {data.doodCount}
                    </div>
                  ) : (
                    <div className="card-page-additional-information__not-in-stock card-page-additional-information__page_template">
                      Нет в наличии
                    </div>
                  )}
                  <div className="card-page-additional-information__rating card-page-additional-information__page_template">
                    Рейтинг: {data.rating}
                  </div>
                  {data.isLowePrice && (
                    <div className="card-page-additional-information__lower-price card-page-additional-information__page_template">
                      Низкая цена
                    </div>
                  )}
                  {data.isBuyMostOften && (
                    <div className="card-page-additional-information__buy-most-often card-page-additional-information__page_template">
                      Часто покупают
                    </div>
                  )}
                  {data.isGreatDeals && (
                    <div className="card-page-additional-information__great-deals card-page-additional-information__page_template">
                      Выгодное предложение
                    </div>
                  )}
                  {data.isRecommend && (
                    <div className="card-page-additional-information__recommend card-page-additional-information__page_template">
                      Этот товар рекомендуют другие покупатели
                    </div>
                  )}
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
        title={`Описание: ${data.title}`}
        description={data.fullDescription}
      />

      <ModalGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={allImages}
        initialIndex={activeImageIndex}
        title={data.title}
      />

      <OrderProductModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={data}
        price={priceGoodWithDiscount || data.priceWithoutDiscount}
      />
    </section>
  );
};

export default Product;