// app/api/products/category/[slug]/route.ts
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { CATEGORIES } from '@/configs/shop';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const category = CATEGORIES.find(c => c.slug === slug);
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Категория не найдена' },
        { status: 404 }
      );
    }
    
    const db = await getDb();
    const collection = db.collection(category.id);
    
    const total = await collection.countDocuments();
    const products = await collection
      .find({})
      .sort({ isStock: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    const serializedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
    }));
    
    const hasMore = skip + limit < total;
    
    return NextResponse.json({
      success: true,
      products: serializedProducts,
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