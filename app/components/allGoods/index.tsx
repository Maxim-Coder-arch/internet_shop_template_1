// app/catalog/page.tsx (пример использования)
import { getAllProducts } from '@/lib/get-data/products';
import { websiteData as data } from '@/data/websiteData';
import AllGoodsClient from './allGoodsClient';

export default async function CatalogPage() {
  
  return (
    <AllGoodsClient 
      goodsHeaderData={data.allDoods.goodsheader}
    />
  );
}