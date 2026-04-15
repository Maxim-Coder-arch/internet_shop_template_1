import { IProduct } from "@/types/interfaces.type";

export const getFilteredGoods = (products: IProduct[], activeFilter: string) => {
  switch(activeFilter) {
    case "most-often":
      return products.filter(good => good.isBuyMostOften);
    case "great-deals":
      return products.filter(good => good.isGreatDeals);
    case "recommend":
      return products.filter(good => good.isRecommend);
    default:
      return products;
  }
};