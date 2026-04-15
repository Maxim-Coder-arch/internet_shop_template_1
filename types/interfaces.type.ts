export interface IGoodCardProps {
  id?: string;
  title: string;
  subTitle: string;
  image: string;
  priceWithoutDiscount: number;
  isDiscount: boolean;
  discount: string;
  isStock: boolean;
  doodCount: number;
  rating: number;
  isBuyMostOften: boolean;
  isGreatDeals: boolean;
  isRecommend: boolean;
}






/**
 * Основной интерфейс товара
 * Используется везде: и для статики, и для БД
 */
export interface IProduct {
  // Уникальный идентификатор
  _id: string;                    // ← всегда строка (ObjectId из БД или фейковый ID для статики)
  
  // Основная информация
  title: string;
  subTitle: string;
  image: string;
  addititionalImage: string[];    // массив URL дополнительных изображений
  
  // Цена и скидки
  priceWithoutDiscount: string;
  isDiscount: boolean;
  discount: string;               // например "20%"
  
  // Наличие и количество
  isStock: boolean;
  doodCount: number;              // количество на складе
  
  // Рейтинг
  rating: number;                 // 0-5
  
  // Категоризация (для фильтров)
  isLowerPrice: boolean;
  isBuyMostOften: boolean;
  isGreatDeals: boolean;
  isRecommend: boolean;
  
  // Полное описание
  fullDescription: string;
  
  // Служебные поля (для БД)
  categoryId?: string;            // ID категории (если товар в категории)
  _categoryId?: string;          // категория из БД
  _categoryName?: string;        // название категории из БД
  
  // Временные метки
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Тип для создания нового товара (без полей, которые генерируются автоматически)
 */
export type IProductCreate = Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>;

/**
 * Тип для обновления товара (все поля опциональны)
 */
export type IProductUpdate = Partial<IProductCreate>;