// lib/db.ts
import clientPromise from '.';
import { DATABASE_NAME } from '@/configs/shop';

/**
 * Получить подключение к базе данных
 */
export async function getDb() {
  const client = await clientPromise;
  return client.db(DATABASE_NAME);
}

/**
 * Получить коллекцию по имени
 */
export async function getCollection(collectionName: string) {
  const db = await getDb();
  return db.collection(collectionName);
}