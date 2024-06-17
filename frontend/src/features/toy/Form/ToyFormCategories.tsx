import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "../../../components/UI/form";
import { CATEGORIES_AGE, CATEGORIES_TYPE } from "../../../lib/consts";
import CategoryChips from "./CategoryChips";

function ToyFormCategories() {
  const { control } = useFormContext();
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl sm:tex-2xl font-sans text-[#3a0e7b]">
          Toy for age
        </h3>
        <FormField
          control={control}
          name="ageCategory"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {CATEGORIES_AGE.map(category => (
                  <CategoryChips
                    title={category.title}
                    key={category.id}
                    field={field}
                  />
                ))}
              </div>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div>
        <h3 className="text-xl sm:tex-2xl font-sans text-[#3a0e7b]">
          Toy category
        </h3>
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {CATEGORIES_TYPE.map(category => (
                  <CategoryChips
                    title={category.title}
                    key={category.id}
                    field={field}
                  />
                ))}
              </div>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default ToyFormCategories;
