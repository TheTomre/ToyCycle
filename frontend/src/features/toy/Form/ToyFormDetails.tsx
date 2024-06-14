import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../../components/UI/form";
import { Input } from "../../../components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../components/UI/select";
import { Textarea } from "../../../components/UI/textarea";
import { CONDITION } from "../../../lib/consts";

function ToyFormDetails() {
  const { control } = useFormContext();
  return (
    <div className="font-sans">
      <div>
        <h2 className="text-xl sm:tex-2xl font-sans">Toy Details</h2>

        <h3 className=" font-sans">
          Add details about the toy you want to add to your inventory.
        </h3>
      </div>
      <div className="flex-col sm:flex-row flex sm:justify-between sm:items-center w-full gap-2 sm:gap-5">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full sm:w-2/3">
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  className="border-gray-400 border rounded placeholder:text-gray-300"
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
            <FormItem className=" w-3/4 sm:w-1/3">
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <FormControl>
                <Input
                  className="border-gray-400 border rounded placeholder:text-gray-300"
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

      <div className="flex-col sm:flex-row flex sm:justify-between sm:items-center w-full gap-2 sm:gap-5">
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Input
                  className="border-gray-400 border rounded placeholder:text-gray-300"
                  placeholder="Ex: Barbie Doll in pink dress"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />
        <div className="sm:w-1/2 flex-row flex  w-full gap-2 sm:gap-5">
          <FormField
            control={control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel htmlFor="brand">Brand</FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-400 border rounded placeholder:text-gray-300"
                    placeholder="Ex: Barbie"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="origin"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel htmlFor="origin">Made in</FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-400 border rounded placeholder:text-gray-300"
                    placeholder="Ex: USA"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex-col sm:flex-row flex sm:justify-between sm:items-center w-full gap-2 sm:gap-5">
        <FormField
          control={control}
          name="condition"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/3">
              <FormLabel>Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border-gray-400 border rounded ">
                  <SelectTrigger>
                    <SelectValue
                      className="placeholder:text-gray-300 "
                      placeholder="Toy condition"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-100 rounded">
                  {CONDITION.map(item => (
                    <SelectItem
                      className="bg-gray-50 w-full"
                      key={item}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-[#ff4d4d] text-xs" />
            </FormItem>
          )}
        />

        <div className="sm:w-2/3 flex-row flex  w-full gap-2 sm:gap-5">
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-1/2 ">
                <FormLabel htmlFor="price">Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="border-gray-400 border rounded placeholder:text-gray-300"
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
              <FormItem className="w-1/2">
                <FormLabel htmlFor="tokenValue">Tokens</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="border-gray-400 border rounded placeholder:text-gray-300"
                    placeholder="Ex: 10"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="status"
            render={field => (
              <FormItem className="w-1/2">
                <FormLabel htmlFor="tokenValue">Tokens</FormLabel>
                <FormControl>
                  <Input disabled {...field} value="available" />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={control}
        name="fullDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="fullDescription">Full Description</FormLabel>
            <FormControl>
              <Textarea
                className="border-gray-400 border rounded placeholder:text-gray-300"
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
