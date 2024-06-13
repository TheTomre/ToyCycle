import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { Button } from "./UI/button";
import { Form, FormControl, FormField, FormItem } from "./UI/form";
import { Input } from "./UI/input";

const serchFormSchema = z.object({
  search: z.string({
    required_error: "Search query is required"
  })
});

export type SearchFormValues = z.infer<typeof serchFormSchema>;

type SearchProps = {
  onSubmit: (data: SearchFormValues) => void;
  placeholder: string;
  onReset: () => void;
};

function Search({ onSubmit, placeholder, onReset }: SearchProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(serchFormSchema)
  });

  const handleClearSearch = () => {
    form.reset({
      search: ""
    });

    if (onReset) onReset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex px-2 py-4 sm:px-4 sm:py-6 bg-[#70e2d2] justify-center items-center ${form.formState.errors.search && "border border-red-700"} `}
      >
        <div className="relative">
          <FormField
            control={form.control}
            name="search"
            render={field => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="px-4 py-1 h-10 w-56 sm:w-96 shadow-none border-0 bg-white placeholder:text-gray-500 font-sans  text-[#280b5f] focus:ring-0 focus:border-0"
                    placeholder={placeholder}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {form.formState.isDirty && (
            <Button
              type="button"
              onClick={handleClearSearch}
              variant="ghost"
              className="p-2 text-[10px] shadow-none absolute top-[2px] right-1"
            >
              <GrClose size={18} className="text-[#280b5f] hidden md:block" />
            </Button>
          )}
        </div>
        <Button
          type="button"
          className="px-4 min-h-[40px] font-mono uppercase text-[#280b5f] py-2 h-inherit shadow-none hover:bg-[#1ae0c6]"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}

export default Search;
