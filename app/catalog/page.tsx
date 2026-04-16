// app/catalog/page.tsx
import AllGoodsClient from '../components/allGoods/allGoodsClient';
import { websiteData as data } from '@/data/websiteData';

export default async function CatalogPage() {
  return (
    <AllGoodsClient 
      goodsHeaderData={data.allDoods.goodsheader}
    />
  );
}