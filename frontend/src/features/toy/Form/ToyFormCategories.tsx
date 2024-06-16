import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "../../../components/UI/form";
import { CATEGORIES_AGE, CATEGORIES_TYPE } from "../../../lib/consts";
import CategoryChips from "./CategoryChips";

function ToyFormCategories() {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-xl sm:tex-2xl">Toy for age</h3>
        <FormField
          control={control}
          name="ageCategory"
          render={({ field }) => (
            <FormItem className="mb-5">
              <div className="flex flex-wrap gap-2 sm:gap-3 max-w-full sm:max-w-[70%] mt-1 mb-1">
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
        <h3 className="text-xl sm:tex-2xl">Toy category</h3>
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem className="mb-3">
              <div className="flex flex-wrap gap-2 sm:gap-3 max-w-full sm:max-w-[70%] mt-1 mb-1">
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
