import FilterPageClient from "@/app/share/filteredPageClient";

export default function ActionsPage() {
  return (
    <FilterPageClient 
      filterType="discount" 
      title="Акции" 
      subtitle="Товары со скидкой"
    />
  );
}