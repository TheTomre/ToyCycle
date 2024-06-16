import {
  useFormContext,
  ControllerRenderProps,
  FieldValues
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from "../../../components/UI/form";
import { Input } from "../../../components/UI/input";

function ToyFormImage() {
  const { control } = useFormContext();

  const handlerAddImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, "images">
  ) => {
    field.onChange(e.target.files?.length ? [...e.target.files] : []);
  };

  return (
    <div>
      <div>
        <h3 className="text-xl sm:tex-2xl font-sans text-[#3a0e7b]">
          Toy images
        </h3>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormControl>
                <Input
                  className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  type="file"
                  multiple
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={e => handlerAddImage(e, field)}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default ToyFormImage;
