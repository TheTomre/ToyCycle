import { Button } from "./UI/button";

type CategoryItemProps = {
  title: string;
  styles?: string;
};
function CategoryItem({ title, styles }: CategoryItemProps) {
  return (
    <Button
      className={`px-3 py-2 sm:px-6 sm:py-4 h-auto w-auto font-mono tracking-tight bg-[#3a0e7b] hover:scale-105 hover:bg-[#3a0e7b] transition-all duration-300 text-white ${styles}`}
    >
      {title}
    </Button>
  );
}

export default CategoryItem;
