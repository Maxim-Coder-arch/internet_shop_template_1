import FilterPageClient from "@/app/share/filteredPageClient";

export default function InStockPage() {
  return (
    <FilterPageClient 
      filterType="in-stock" 
      title="В наличии" 
      subtitle="Товары, которые есть на складе"
    />
  );
}