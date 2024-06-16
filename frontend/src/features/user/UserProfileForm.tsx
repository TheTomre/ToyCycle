import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../components/UI/form";
import { Input } from "../../components/UI/input";
import { Button } from "../../components/UI/button";
import { User } from "./userTypes";

const formUserSchema = z.object({
  email: z.string().optional(),
  bio: z.string().min(1).max(120),
  firstName: z.string().min(1, "User first name is required").max(120),
  lastName: z.string().min(1, "User last name is required").max(120),
  city: z.string().min(1, "City is required").max(120),
  country: z.string().min(1, "Country is required").max(120),
  street1: z.string().min(1, "Address is required").max(120),
  street2: z.string().optional(),
  zipcode: z.string().min(1, "Zipcode is required").max(50)
});

type UserFormSchema = z.infer<typeof formUserSchema>;

type UserProfileFormProps = {
  currentUser: User;
  onSave: (userProfileData: UserFormSchema) => void;
  isLoading: boolean;
};

function UserProfileForm({
  onSave,
  isLoading,
  currentUser
}: UserProfileFormProps) {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formUserSchema),
    defaultValues: currentUser
  });
  // const { user } = useAuth0();

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  const handlerSubmit = (formData: UserFormSchema) => {
    const newFormData: UserFormSchema = {
      email: currentUser.email,
      ...formData
    };
    onSave(newFormData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlerSubmit)}
        className="p-4 md:max-w-3xl mx-auto"
      >
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-t-lg">
          <h3 className="text-xl font-bold">
            {currentUser?.firstName ?? "Your"} profile
          </h3>
          <h5 className="text-sm">Update your personal information</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] absolute -bottom-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  Bio
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h5 className="uppercase font-semibold text-[#3a0e7b] pt-4">Address</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  Country
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street1"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  Address 1
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street2"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  Address 2
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b] relative top-1">
                  Zipcode
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? "animate-spin" : ""
            } bg-[#3a0e7b] font-mono px-6 py-3 text-white hover:bg-[#4e2a85] transition-transform duration-300 ease-in-out transform hover:scale-105`}
          >
            {isLoading ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserProfileForm;
