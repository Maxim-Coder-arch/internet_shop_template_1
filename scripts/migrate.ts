// scripts/migrate-standalone.ts
import { MongoClient } from 'mongodb';

// ПОДСТАВЬТЕ ВАШУ СТРОКУ ПОДКЛЮЧЕНИЯ!
const MONGODB_URI = 'mongodb+srv://internet_shop_template:4djSJyNYTYbWQ6ri@cluster0.ifimnlq.mongodb.net/?appName=Cluster0';

// Скопируйте массив товаров сюда
const products = [
  {
    id: 1,
    title: "Apple Watch Ultra",
    subTitle: "Спортивные часы премиум",
    image: "https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-97321.jpg?t=st=1775129636~exp=1775133236~hmac=65b0a8d91455fd074b1634aaf9ea8eb8d93a74f97c51329616124b1409ab611e&w=1480",
    priceWithoutDiscount: "89990",
    isDiscount: true,
    discount: "20%",
    isStock: true,
    rating: 4.9,
    isLowerPrice: false,
    isBuyMostOften: false,
    isGreatDeals: true,
    isRecommend: true,
    doodCount: 5,
    fullDescription: "Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.Apple Watch Ultra — титановый корпус, сапфировое стекло, до 36 часов работы, GPS, дайв-режим до 40 метров.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/closeup-watch_53876-32028.jpg?t=st=1775747878~exp=1775751478~hmac=89d4d1160bfe7cc73b5b224997b8070734f7d794c2d5ff8cb1b3c3393658a96b&w=1480",
      "https://img.freepik.com/free-photo/stylish-golden-watch-white-surface_181624-27078.jpg?t=st=1775747906~exp=1775751506~hmac=875b38659cdf9f070af61dd8834d047e40a6030405649ccf99eac7778769bcc5&w=740",
      "https://img.freepik.com/free-photo/black-wrist-watch_1057-4040.jpg?t=st=1775747928~exp=1775751528~hmac=b68bfd48cf5ac427c523df737117463fd5c9844320d54126edd31135a7272475&w=740",
      "https://img.freepik.com/free-photo/closeup-shot-hand-watch-with-bstrap-reflective-surface_181624-58668.jpg?t=st=1775747950~exp=1775751550~hmac=8f3b6708d41621179baa1251e0b9007d4288f5a0fcb9dd06623902a6b7196d98&w=740",
      "https://img.freepik.com/free-photo/close-up-clock-with-time-change_23-2149241142.jpg?t=st=1775747968~exp=1775751568~hmac=0f1c6ce00c39d5189e77d23dbd18cd533eceeb3e824de44ab522b55f13ff6165&w=740"
    ]
  },
  {
    id: 2,
    title: "Samsung Galaxy Watch 6",
    subTitle: "Классические смарт-часы",
    image: "https://img.freepik.com/free-photo/high-angle-smartwatch-with-copy-space_23-2148966577.jpg",
    priceWithoutDiscount: "32990",
    isDiscount: false,
    discount: "0%",
    isStock: true,
    rating: 4.7,
    isLowerPrice: true,
    isBuyMostOften: true,
    isGreatDeals: false,
    isRecommend: true,
    doodCount: 15,
    fullDescription: "Samsung Galaxy Watch 6 — вращающийся безель, AMOLED-экран, отслеживание сна, ЭКГ, измерение давления. Работает до 40 часов без подзарядки.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/smartwatch-with-metallic-band_53876-143024.jpg",
      "https://img.freepik.com/free-photo/smartwatch-with-black-band_53876-143023.jpg"
    ]
  },
  {
    id: 3,
    title: "Xiaomi Mi Band 8",
    subTitle: "Фитнес-браслет",
    image: "https://img.freepik.com/free-photo/smartwatch-white-background_53876-125745.jpg",
    priceWithoutDiscount: "3990",
    isDiscount: true,
    discount: "10%",
    isStock: true,
    rating: 4.5,
    isLowerPrice: true,
    isBuyMostOften: true,
    isGreatDeals: false,
    isRecommend: false,
    doodCount: 50,
    fullDescription: "Xiaomi Mi Band 8 — 1.62-дюймовый AMOLED-экран, до 16 дней работы, 150+ режимов тренировок, отслеживание сна и пульса.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/smartwatch-with-orange-band_53876-148294.jpg",
      "https://img.freepik.com/free-photo/smartwatch-with-green-band_53876-148295.jpg"
    ]
  },
  {
    id: 4,
    title: "Garmin Fenix 7",
    subTitle: "Экстремальные GPS-часы",
    image: "https://img.freepik.com/free-photo/smartwatch-with-heart-rate-monitor_53876-138192.jpg",
    priceWithoutDiscount: "69990",
    isDiscount: true,
    discount: "15%",
    isStock: false,
    rating: 4.8,
    isLowerPrice: false,
    isBuyMostOften: false,
    isGreatDeals: true,
    isRecommend: true,
    doodCount: 0,
    fullDescription: "Garmin Fenix 7 — прочный корпус, топографические карты, солнечная зарядка, до 57 дней в режиме энергосбережения. Для путешественников и спортсменов.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/smartwatch-with-leather-band_53876-143025.jpg",
      "https://img.freepik.com/free-photo/smartwatch-with-blue-band_53876-143026.jpg"
    ]
  },
  {
    id: 5,
    title: "Huawei Watch GT 4",
    subTitle: "Стильные гибридные часы",
    image: "https://img.freepik.com/free-photo/smartwatch-with-silver-band_53876-148293.jpg",
    priceWithoutDiscount: "19990",
    isDiscount: true,
    discount: "25%",
    isStock: true,
    rating: 4.6,
    isLowerPrice: true,
    isBuyMostOften: true,
    isGreatDeals: true,
    isRecommend: false,
    doodCount: 8,
    fullDescription: "Huawei Watch GT 4 — 14 дней автономности, более 100 режимов тренировок, анализ состава тела, Bluetooth-звонки.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/smartwatch-with-brown-band_53876-148296.jpg",
      "https://img.freepik.com/free-photo/smartwatch-with-white-band_53876-148297.jpg"
    ]
  },
  {
    id: 6,
    title: "Amazfit GTR 4",
    subTitle: "Доступные умные часы",
    image: "https://img.freepik.com/free-photo/white-smartwatch-isolated-white-background_53876-125746.jpg",
    priceWithoutDiscount: "14990",
    isDiscount: false,
    discount: "0%",
    isStock: true,
    rating: 4.4,
    isLowerPrice: true,
    isBuyMostOften: false,
    isGreatDeals: false,
    isRecommend: false,
    doodCount: 25,
    fullDescription: "Amazfit GTR 4 — 1.43-дюймовый AMOLED-экран, до 14 дней работы, GPS, Bluetooth-звонки, более 150 спортивных режимов.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/smartwatch-with-yellow-band_53876-148298.jpg",
      "https://img.freepik.com/free-photo/smartwatch-with-red-band_53876-148299.jpg"
    ]
  },
  {
    id: 7,
    title: "Google Pixel Watch 2",
    subTitle: "Интеграция с Fitbit",
    image: "https://img.freepik.com/free-photo/smartwatch-with-black-band-black-background_53876-148300.jpg",
    priceWithoutDiscount: "34990",
    isDiscount: true,
    discount: "10%",
    isStock: true,
    rating: 4.3,
    isLowerPrice: false,
    isBuyMostOften: false,
    isGreatDeals: false,
    isRecommend: true,
    doodCount: 12,
    fullDescription: "Google Pixel Watch 2 — чип Snapdragon W5, отслеживание стресса, безопасность и экстренная помощь, Fitbit-интеграция.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/smartwatch-with-metal-band_53876-148302.jpg",
      "https://img.freepik.com/free-photo/smartwatch-with-silver-band-white-background_53876-148301.jpg"
    ]
  },
  {
    id: 8,
    title: "Nothing Watch (1)",
    subTitle: "Дизайн с подсветкой",
    image: "https://img.freepik.com/free-photo/smartwatch-with-transparent-band_53876-148292.jpg",
    priceWithoutDiscount: "24990",
    isDiscount: false,
    discount: "0%",
    isStock: true,
    rating: 4.2,
    isLowerPrice: false,
    isBuyMostOften: false,
    isGreatDeals: true,
    isRecommend: false,
    doodCount: 7,
    fullDescription: "Nothing Watch (1) — прозрачный дизайн, уникальная подсветка Glyph, интеграция с Nothing OS, уведомления и трекинг активности.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/close-up-clock-with-time-change_23-2149241142.jpg"
    ]
  },
  {
    id: 9,
    title: "OnePlus Watch 2",
    subTitle: "Двойная ОС",
    image: "https://img.freepik.com/free-photo/smartwatch-with-silver-band-white-background_53876-148301.jpg",
    priceWithoutDiscount: "27990",
    isDiscount: true,
    discount: "15%",
    isStock: true,
    rating: 4.5,
    isLowerPrice: false,
    isBuyMostOften: true,
    isGreatDeals: false,
    isRecommend: true,
    doodCount: 10,
    fullDescription: "OnePlus Watch 2 — Wear OS и RTOS, до 12 дней работы, быстрая зарядка 80% за 30 минут, отслеживание здоровья.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/smartwatch-with-metal-band_53876-148302.jpg",
      "https://img.freepik.com/free-photo/smartwatch-with-black-band_53876-143023.jpg"
    ]
  },
  {
    id: 10,
    title: "Suunto 9 Peak Pro",
    subTitle: "Ультра-спортивные часы",
    image: "https://img.freepik.com/free-photo/smartwatch-with-leather-band_53876-143025.jpg",
    priceWithoutDiscount: "54990",
    isDiscount: true,
    discount: "20%",
    isStock: false,
    rating: 4.7,
    isLowerPrice: false,
    isBuyMostOften: false,
    isGreatDeals: true,
    isRecommend: true,
    doodCount: 0,
    fullDescription: "Suunto 9 Peak Pro — 170+ спортивных режимов, навигация по звездам, до 300 часов в режиме экономии, ударопрочный корпус.",
    addititionalImage: [
      "https://img.freepik.com/free-photo/smartwatch-with-blue-band_53876-143026.jpg",
      "https://img.freepik.com/free-photo/smartwatch-with-orange-band_53876-148294.jpg"
    ]
  }
];

async function migrate() {
  console.log('🔄 Начинаем миграцию...');
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Подключено к MongoDB');
    
    const db = client.db('all_products');
    
    // Очищаем коллекцию
    await db.collection('products').deleteMany({});
    console.log('🗑️ Старые данные удалены');
    
    // Вставляем товары
    const productsToInsert = products.map(p => ({
      ...p,
      originalId: p.id,
      id: undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    const result = await db.collection('products').insertMany(productsToInsert);
    console.log(`✅ Перенесено ${result.insertedCount} товаров`);
    
    // Создаём индекс
    await db.collection('products').createIndex(
      { title: "text", subTitle: "text", fullDescription: "text" },
      { name: "search_index" }
    );
    console.log('✅ Поисковый индекс создан');
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await client.close();
  }
}

migrate();