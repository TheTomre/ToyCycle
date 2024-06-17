import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl
} from "../../../components/UI/form";
import { Input } from "../../../components/UI/input";
import { Textarea } from "../../../components/UI/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../components/UI/select";
import { CONDITION } from "../../../lib/consts";

function ToyFormDetails() {
  const { control } = useFormContext();
  return (
    <div className="font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  placeholder="Ex: Barbie Doll"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
                Quantity
              </FormLabel>
              <FormControl>
                <Input
                  className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  placeholder="Ex: 1"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
                Description
              </FormLabel>
              <FormControl>
                <Input
                  className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  placeholder="Ex: Barbie Doll in pink dress"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="brand"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
                Brand
              </FormLabel>
              <FormControl>
                <Input
                  className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  placeholder="Ex: Barbie"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="origin"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
                Made in
              </FormLabel>
              <FormControl>
                <Input
                  className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  placeholder="Ex: USA"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="condition"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
                Condition
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out">
                    <SelectValue placeholder="Toy condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {CONDITION.map(item => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="px-2 py-2 hover:bg-indigo-100"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
                Price
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  placeholder="Ex: 30"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="tokenValue"
          render={({ field }) => (
            <FormItem className="py-2 relative">
              <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
                Tokens
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  placeholder="Ex: 10"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="fullDescription"
        render={({ field }) => (
          <FormItem className="py-2 relative">
            <FormLabel className="font-sans text-sm sm:text-base text-[#3a0e7b] pb-2">
              Full Description
            </FormLabel>
            <FormControl>
              <Textarea
                className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                placeholder="Ex: Barbie Doll in pink dress with matching shoes. Comes with a comb and a purse."
                {...field}
              />
            </FormControl>
            <FormMessage className="text-[#ff4d4d] text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default ToyFormDetails;
