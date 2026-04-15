import FilterPageClient from "@/app/share/filteredPageClient";

export default function HighRatingPage() {
  return (
    <FilterPageClient 
      filterType="high-rating" 
      title="Высокий рейтинг" 
      subtitle="Товары с рейтингом выше 4"
    />
  );
}