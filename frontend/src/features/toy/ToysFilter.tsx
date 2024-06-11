import { ChangeEvent } from "react";
import { CategoryType } from "types/shared";
import { ImCheckmark } from "react-icons/im";
import { Button } from "../../components/UI/button";
import { useAppDispatch } from "../../hooks/redux";
import { resetToysFilter } from "./toySlice";
import { Label } from "../../components/UI/label";

type ToysFilterProps = {
  categorList: CategoryType[];
  onChange: (category: string[]) => void;
  selectedCategory: string[];
};

function ToysFilter({
  categorList,
  onChange,
  selectedCategory
}: ToysFilterProps) {
  const dispatch = useAppDispatch();

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const chousenCategory = event.target.value;
    const isChecked = event.target.checked;

    const newCategoryList = isChecked
      ? [...selectedCategory, chousenCategory]
      : selectedCategory.filter(category => category !== chousenCategory);

    onChange(newCategoryList);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <Button
          onClick={() => dispatch(resetToysFilter())}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-[#280b5f]"
        >
          Reset Filters
        </Button>
      </div>
      {categorList.map(category => {
        const isSelected = selectedCategory.includes(category.title);
        return (
          <div className="flex space-y-1" key={category.id}>
            <input
              id={`category_${category.title}`}
              type="checkbox"
              className="hidden"
              value={category.title}
              checked={isSelected}
              onChange={handleCuisinesChange}
            />
            <Label
              htmlFor={`category_${category.title}`}
              className={`flex flex-1 font-sans items-center cursor-pointer text-s px-4 py-2 font-semibold ${
                isSelected
                  ? "border border-[#70e2d2] text-[#3a0e7b]"
                  : "border border-[#280b5f] text-[#280b5f]"
              }`}
            >
              {isSelected && <ImCheckmark size={20} color="bg-[#70e2d2]" />}
              {category.title}
            </Label>
          </div>
        );
      })}
    </>
  );
}

export default ToysFilter;
