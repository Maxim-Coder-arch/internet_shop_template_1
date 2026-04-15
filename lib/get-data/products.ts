// lib/get-data/products.ts
import { getDb } from '../db';
import { CATEGORIES } from '@/configs/shop';

export async function getProductsByCategory(
  categorySlug: string, 
  page: number = 1, 
  limit: number = 10
) {
  const db = await getDb();
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  
  if (!category) {
    return { products: [], category: null, total: 0, hasMore: false };
  }
  
  const skip = (page - 1) * limit;
  const collection = db.collection(category.id);
  
  // Получаем общее количество
  const total = await collection.countDocuments();
  
  // Получаем товары с пагинацией
  const products = await collection
    .find({})
    .sort({ isStock: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
  
  const serializedProducts = products.map(product => ({
    ...product,
    _id: product._id.toString(),
    _categoryId: category.id,
    _categoryName: category.name,
  }));
  
  const hasMore = skip + limit < total;
  
  return { 
    products: serializedProducts, 
    category, 
    total, 
    hasMore,
    page,
    limit
  };
}