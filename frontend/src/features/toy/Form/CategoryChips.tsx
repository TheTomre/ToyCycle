import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Checkbox } from "../../../components/UI/checkbox";
import { FormControl, FormItem, FormLabel } from "../../../components/UI/form";

type CategoryChipsProps = {
  title: string;
  field:
    | ControllerRenderProps<FieldValues, "category">
    | ControllerRenderProps<FieldValues, "ageCategory">;
};

const handleCheck = (
  isChecked: boolean,
  fieldValue:
    | ControllerRenderProps<FieldValues, "category">
    | ControllerRenderProps<FieldValues, "ageCategory">,
  title: string
) => {
  if (isChecked) {
    fieldValue.onChange([...fieldValue.value, title]);
  } else {
    fieldValue.onChange(
      fieldValue.value.filter((item: string) => item !== title)
    );
  }
};

function CategoryChips({ title, field }: CategoryChipsProps) {
  return (
    <FormItem>
      <FormControl>
        <Checkbox
          className="opacity-0 absolute"
          checked={field.value.includes(title)}
          onCheckedChange={(isChecked: boolean) =>
            handleCheck(isChecked, field, title)
          }
        />
      </FormControl>
      <FormLabel
        className={`${
          field.value.includes(title)
            ? "bg-[#3a0e7b]  text-white"
            : "bg-[#70e2d2] text-[#3a0e7b]"
        } flex items-center p-2 sm:p-3 rounded-full font-sans 
        transition-colors duration-300 cursor-pointer
         hover:bg-[#3a0e7b] hover:text-white`}
      >
        {title}
      </FormLabel>
    </FormItem>
  );
}

export default CategoryChips;
