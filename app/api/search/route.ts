// app/api/search/route.ts (НОВАЯ БЫСТРАЯ ВЕРСИЯ)
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

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
    const collection = db.collection('all_products');
    
    // Поиск по текстовому индексу (или через regex)
    const searchLower = query.toLowerCase();
    
    // Вариант 1: через регулярные выражения (работает всегда)
    const mongoFilter = {
      $or: [
        { title: { $regex: searchLower, $options: 'i' } },
        { subTitle: { $regex: searchLower, $options: 'i' } },
        { fullDescription: { $regex: searchLower, $options: 'i' } },
      ]
    };
    
    // Получаем общее количество
    const total = await collection.countDocuments(mongoFilter);
    
    // Получаем товары с пагинацией
    const products = await collection
      .find(mongoFilter)
      .sort({ isStock: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    const hasMore = skip + limit < total;
    
    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
    }));
    
    return NextResponse.json({ 
      success: true, 
      products: serializedProducts,
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