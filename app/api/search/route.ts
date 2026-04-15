// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { CATEGORIES } from '@/configs/shop';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    if (!query.trim()) {
      return NextResponse.json({ success: true, products: [], total: 0, hasMore: false });
    }
    
    const db = await getDb();
    const searchLower = query.toLowerCase();
    const allResults: any[] = [];
    
    // Ищем во всех категориях
    for (const category of CATEGORIES) {
      const products = await db
        .collection(category.id)
        .find({
          $or: [
            { title: { $regex: searchLower, $options: 'i' } },
            { subTitle: { $regex: searchLower, $options: 'i' } },
            { fullDescription: { $regex: searchLower, $options: 'i' } },
          ]
        })
        .toArray();
      
      const resultsWithCategory = products.map(product => ({
        ...product,
        _id: product._id.toString(),
        _categoryId: category.id,
        _categoryName: category.name,
      }));
      
      allResults.push(...resultsWithCategory);
    }
    
    const total = allResults.length;
    const paginatedResults = allResults.slice(skip, skip + limit);
    const hasMore = skip + limit < total;
    
    return NextResponse.json({ 
      success: true, 
      products: paginatedResults,
      total,
      page,
      limit,
      hasMore
    });
    
  } catch (error) {
    console.error('Ошибка поиска:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}