// app/catalog/page.tsx (или любая страница, где используется AllGoods)
import { getAllProducts } from '@/lib/get-data/products';
import AllGoodsClient from '../components/allGoods/allGoodsClient';

export default async function CatalogPage() {
  // Получаем данные на сервере
  const products = await getAllProducts();
  
  // Передаём в клиентский компонент
  return <AllGoodsClient initialProducts={products} />;
}