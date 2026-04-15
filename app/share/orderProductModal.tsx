import Image from "next/image";
import "../styles/share/order-product-modal.scss";
import { IGoodCardProps } from "@/types/interfaces.type";

interface IOrderProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IGoodCardProps;
  price: number | string;
}

const OrderProductModal = ({ isOpen, onClose, product, price }: IOrderProductModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="order-product-modal-overlay" onClick={onClose}>
      <div className="order-product-modal" onClick={(e) => e.stopPropagation()}>
        
        <button className="order-product-modal__close" onClick={onClose}>×</button>
        
        <div className="order-product-modal__product">
          <div className="__image-wrapper">
            <Image 
              src={product.image} 
              alt={product.title} 
              width={300} 
              height={300} 
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="__body">
            <h3>{product.title}</h3>
            <p>{product.subTitle}</p>
            <span>{price} ₽</span>
          </div>
        </div>

        <form>
          <input type="text" placeholder="Имя *" required />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Телефон или ссылка на соцсеть *" required />
          <textarea placeholder="Комментарий (необязательно)" />
          
          <div className="form-submit-footer">
            <button type="submit">Заказать</button>
            <span>или</span>
            <a href="tel:891256327634">Узнать подробности</a>
          </div>
        </form>

      </div>
    </div>
  );
};

export default OrderProductModal;