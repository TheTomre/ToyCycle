import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  resetToysFilter,
  setAgeCategory,
  setBrandCategory,
  setCategory
} from "../toySlice";

import { Button } from "../../../components/UI/button";
import ToysFilter from "./ToysFilter";

import { CATEGORIES_AGE, CATEGORIES_TYPE } from "../../../lib/consts";

function ToyFilterList() {
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAgeCategoryOpen, setIsAgeCategoryOpen] = useState(false);

  const { ageCategory, brand, category } = useAppSelector(state => state.toys);

  const dispatch = useAppDispatch();

  const toggleSelectedCategory = (
    selected: string,
    categoryName: "category" | "ageCategory" | "brand"
  ) => {
    switch (categoryName) {
      case "category": {
        const newCategories = category.includes(selected)
          ? category.filter(cat => cat !== selected)
          : [...category, selected];
        dispatch(setCategory(newCategories));
        break;
      }
      case "ageCategory": {
        const newCategories = ageCategory.includes(selected)
          ? ageCategory.filter(cat => cat !== selected)
          : [...ageCategory, selected];
        dispatch(setAgeCategory(newCategories));
        break;
      }

      case "brand": {
        const newCategories = brand.includes(selected)
          ? brand.filter(cat => cat !== selected)
          : [...brand, selected];
        dispatch(setBrandCategory(newCategories));
        break;
      }
      default:
        break;
    }
  };

  return (
    <aside className=" max-w-[20%]">
      <div className="flex justify-between items-center px-2">
        <Button
          onClick={() => dispatch(resetToysFilter())}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-[#280b5f]"
        >
          Clear Filters
        </Button>
      </div>
      <ToysFilter
        isOpen={isAgeCategoryOpen}
        toggleIsOpen={() => setIsAgeCategoryOpen(!isAgeCategoryOpen)}
        categoryList={CATEGORIES_AGE}
        categoryName="ageCategory"
        onSelect={toggleSelectedCategory}
        title="Age Category"
      />
      <ToysFilter
        isOpen={isCategoryOpen}
        toggleIsOpen={() => setIsCategoryOpen(!isCategoryOpen)}
        categoryList={CATEGORIES_TYPE}
        categoryName="category"
        onSelect={toggleSelectedCategory}
        title="Toy Category"
      />
      <ToysFilter
        isOpen={isBrandOpen}
        toggleIsOpen={() => setIsBrandOpen(!isBrandOpen)}
        categoryList={CATEGORIES_TYPE}
        categoryName="brand"
        onSelect={toggleSelectedCategory}
        title="Brand"
      />
    </aside>
  );
}

export default ToyFilterList;
