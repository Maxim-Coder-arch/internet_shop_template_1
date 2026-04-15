// // app/api/products/route.ts
// import { NextResponse } from 'next/server';
// import { getDb } from '@/lib/db';
// import { CATEGORIES } from '@/configs/shop';

// export async function GET() {
//   try {
//     const db = await getDb();
//     const allProducts = [];
    
//     for (const category of CATEGORIES) {
//       const products = await db
//         .collection(category.id)
//         .find({})
//         .sort({ createdAt: -1 })
//         .toArray();
      
//       const productsWithCategory = products.map(product => ({
//         ...product,
//         _id: product._id.toString(),
//         _categoryId: category.id,
//         _categoryName: category.name,
//         createdAt: product.createdAt?.toISOString?.() || product.createdAt,
//         updatedAt: product.updatedAt?.toISOString?.() || product.updatedAt,
//       }));
      
//       allProducts.push(...productsWithCategory);
//     }
    
//     return NextResponse.json({ success: true, products: allProducts });
    
//   } catch (error) {
//     console.error('Ошибка получения товаров:', error);
//     return NextResponse.json(
//       { success: false, error: 'Ошибка сервера' },
//       { status: 500 }
//     );
//   }
// }



// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { CATEGORIES } from '@/configs/shop';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '24');
    const filter = searchParams.get('filter') || 'all';
    const skip = (page - 1) * limit;
    
    const db = await getDb();
    
    // Параллельно собираем товары из всех категорий
    const categoryPromises = CATEGORIES.map(category => 
      db.collection(category.id).find({}).toArray()
    );
    
    const categoryResults = await Promise.all(categoryPromises);
    
    // Объединяем все товары
    let allProducts: any[] = [];
    categoryResults.forEach((products, idx) => {
      const productsWithCategory = products.map(product => ({
        ...product,
        _id: product._id.toString(),
        _categoryId: CATEGORIES[idx].id,
        _categoryName: CATEGORIES[idx].name,
      }));
      allProducts.push(...productsWithCategory);
    });
    
    // app/api/products/route.ts
const filterMap: Record<string, (p: any) => boolean> = {
  'discount': (p) => p.isDiscount === true,
  'in-stock': (p) => p.isStock === true,
  'high-rating': (p) => p.rating >= 4,
  'lower-price': (p) => p.isLowerPrice === true,
  'most-often': (p) => p.isBuyMostOften === true,
  'great-deals': (p) => p.isGreatDeals === true,
  'recommend': (p) => p.isRecommend === true,
};

if (filter !== 'all' && filterMap[filter]) {
  allProducts = allProducts.filter(filterMap[filter]);
}
    
    // Сортировка по наличию
    allProducts.sort((a, b) => {
      if (a.isStock === b.isStock) return 0;
      return a.isStock ? -1 : 1;
    });
    
    const total = allProducts.length;
    const paginatedProducts = allProducts.slice(skip, skip + limit);
    const hasMore = skip + limit < total;
    
    return NextResponse.json({ 
      success: true, 
      products: paginatedProducts,
      total,
      page,
      limit,
      hasMore
    });
    
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}