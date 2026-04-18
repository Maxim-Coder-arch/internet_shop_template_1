// config/shop.ts
export const DATABASE_NAME = 'nexsol_shop_client1';

export const CATEGORIES = [
  { id: 'mens-bags', name: "Мужские сумки", slug: 'mens-bags', order: 1 },
  { id: 'womens-bags', name: "Женские сумки", slug: 'womens-bags', order: 2 },
  { id: 'mens-belts', name: "Мужские ремни", slug: 'mens-belts', order: 3 },
  { id: 'womens-belts', name: "Женские ремни", slug: 'womens-belts', order: 4 },
  { id: 'childrens-bags', name: "Детские сумки", slug: 'childrens-bags', order: 5 },
  { id: 'childrens-belts', name: "Детские ремни", slug: 'childrens-belts', order: 6 },
  { id: 'materials', name: "Материалы", slug: 'materials', order: 7 },
];

export const PRODUCT_TYPES = [
  { id: 'discount', name: 'Акции', field: 'isDiscount' },
  { id: 'lower-price', name: 'Низкие цены', field: 'isLowerPrice' },
  { id: 'most-often', name: 'Часто покупают', field: 'isBuyMostOften' },
  { id: 'great-deals', name: 'Выгодные предложения', field: 'isGreatDeals' },
  { id: 'recommend', name: 'Рекомендуемые', field: 'isRecommend' },
];