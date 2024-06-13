import { ChangeEvent } from "react";
import { CategoryType } from "types/shared";
import { ImCheckmark } from "react-icons/im";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Label } from "../../../components/UI/label";
import { Button } from "../../../components/UI/button";
import { useAppSelector } from "../../../hooks/redux";

type ToysFilterProps = {
  title: string;
  isOpen: boolean;
  toggleIsOpen: () => void;
  categoryList: CategoryType[];
  categoryName: "category" | "ageCategory" | "brand";
  onSelect: (
    selected: string,
    categoryName: "category" | "ageCategory" | "brand"
  ) => void;
};

function ToysFilter({
  title,
  categoryList,
  categoryName,
  onSelect,
  isOpen,
  toggleIsOpen
}: ToysFilterProps) {
  const currentCategory = useAppSelector(state => state.toys[categoryName]);
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const toyCategory = event.target.value;

    onSelect(toyCategory, categoryName);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mt-2">{title}</div>
      </div>

      <div className="flex flex-col justify-start items-center ">
        {categoryList
          .slice(0, isOpen ? categoryList.length : 3)
          .map(category => {
            const isSelected = currentCategory.includes(category.filterForApi);
            return (
              <div className="flex space-y-1 w-full" key={category.id}>
                <input
                  id={`category_${category.title}`}
                  type="checkbox"
                  className="hidden"
                  value={category.title}
                  checked={isSelected}
                  onChange={handleCategoryChange}
                />
                <Label
                  htmlFor={`category_${category.title}`}
                  className={`flex flex-1 font-sans items-center cursor-pointer text-s px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-[#70e2d2] text-[#3a0e7b]"
                      : "border border-[#280b5f] text-[#280b5f]"
                  }`}
                >
                  {isSelected && (
                    <ImCheckmark
                      size={12}
                      className="mr-1"
                      color="bg-[#70e2d2]"
                    />
                  )}
                  {category.title}
                </Label>
              </div>
            );
          })}

        <Button onClick={toggleIsOpen} variant="link" className="flex-1">
          {isOpen ? (
            <span className="flex flex-row items-center">
              <FaChevronUp className="mr-1" /> Less
            </span>
          ) : (
            <span className="flex flex-row items-center">
              <FaChevronDown className="mr-1" /> More
            </span>
          )}
        </Button>
      </div>
    </>
  );
}

export default ToysFilter;
