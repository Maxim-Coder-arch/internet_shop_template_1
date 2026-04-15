import { CATEGORIES } from "@/configs/shop"

export const modalFilters = CATEGORIES.map(category => ({
  label: category.name,
  link: `/pages/category/${category.slug}`
}));