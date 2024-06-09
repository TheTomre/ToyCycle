import { CategoryType } from "types/shared";
import CategoryItem from "./CategoryItem";

type CategoriesListProps = {
  categories: CategoryType[];
  className?: string;
};

function CategoriesList({ categories, className }: CategoriesListProps) {
  return (
    <section className={className}>
      {categories.map(element => (
        <CategoryItem key={element.id} title={element.title} />
      ))}
    </section>
  );
}

export default CategoriesList;
