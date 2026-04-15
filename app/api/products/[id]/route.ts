// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { CATEGORIES } from '@/configs/shop';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Неверный ID' },
        { status: 400 }
      );
    }
    
    for (const category of CATEGORIES) {
      const product = await db
        .collection(category.id)
        .findOne({ _id: new ObjectId(id) });
      
      if (product) {
        return NextResponse.json({ 
          success: true, 
          product: {
            ...product,
            _id: product._id.toString(),
            _categoryId: category.id,
            _categoryName: category.name,
          }
        });
      }
    }
    
    return NextResponse.json(
      { success: false, error: 'Товар не найден' },
      { status: 404 }
    );
    
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}