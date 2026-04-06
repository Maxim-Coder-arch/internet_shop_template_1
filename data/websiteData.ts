import { products } from "./prroducts.data";


export const websiteData = {
  menu: {
    companyName: "NEXSOL",
    targetAction: "Быстрый заказ",
    consultation: "Консультация",
    categories: [
      {link: "/", category: "Все товары"},
      {link: "/filtered-goods/actions", category: "Акции"},
      {link: "/filtered-goods/in-stock", category: "В наличии"},
      {link: "/filtered-goods/high-rating", category: "С высоким рейтингом"},
      {link: "/filtered-goods/low-price", category: "Самые низкие цены"},
    ]
  },
  heroSection: {
    title: "Расцвет технологий",
    subTitle: "Идея подарков для себя и близких",
    image: "/images/hero-section.jpg",
    target: "Быстрый заказ",
  },
  allDoods: {
    goodsheader: [
      {
        id: "all",
        image: "/images/all-goods.jpg",
        label: "Все товары",
        link: "#"
      },
      {
        id: "most-often",
        image: "/images/purchases.jpg",
        label: "Покупают чаще всего",
        link: "#"
      },
      {
        id: "great-deals",
        image: "/images/offers.jpg",
        label: "Выгодные предложения",
        link: "#"
      },
      {
        id: "recommend",
        image: "/images/recommend.jpg",
        label: "Рекомендуемые",
        link: "#"
      }
    ],
    cards: [
      ...products
    ]
  }
}

export interface IDoods {
  title: string; // название товара
  subTitle: string; // описание товара
  image: string; // картинка товара
  priceWithoutDiscount: string; // цена без скидки
  isDiscount: boolean; // есть ли скидка на товар (относится к категориям)
  discount: string; // размер скидки
  isStock: boolean; // в наличии ли товар (относится к категориям)
  doodCount: number; // количество товаров9 (если товар в наличии)
  rating: number; // рейтинг товара (относится к категориям)
  isLowePrice: boolean; // самые низкие цены (категория)
  isBuyMostOften: boolean; // покупают чаще всего (категория)
  isGreatDeals: boolean; // выгодные предложения (категория)
  isRecommend: boolean; // рекомендуемые (категория)
  fullDescription: string; // полное описание товара для странички с товаром
}