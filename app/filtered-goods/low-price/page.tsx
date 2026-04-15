import FilterPageClient from "@/app/share/filteredPageClient";

export default function LowerPricePage() {
  return (
    <FilterPageClient 
      filterType="lower-price" 
      title="Самые низкие цены" 
      subtitle="Лучшие предложения по цене"
    />
  );
}