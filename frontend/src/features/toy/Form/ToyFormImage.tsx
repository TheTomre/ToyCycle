import {
  useFormContext,
  ControllerRenderProps,
  FieldValues
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
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
        <h3 className="text-xl sm:tex-2xl">Toy images</h3>
      </div>
      <div className="flex flex-col gap-10 w-full sm:w-1/2">
        <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="border-gray-400 border rounded placeholder:text-gray-300"
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
