import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../components/UI/form";
import { Input } from "../../components/UI/input";
import { User } from "./userTypes";
import { Textarea } from "../../components/UI/textarea";
import BlobButton from "../../components/buttons/BlobButton";

const initValues = {
  email: "",
  bio: "",
  firstName: "",
  lastName: "",
  city: "",
  country: "",
  street1: "",
  street2: "",
  zipcode: ""
};

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
    defaultValues: { ...initValues, ...currentUser }
  });

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
        className="p-4 md:max-w-5xl mx-auto"
      >
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-t-lg">
          <h3 className="text-xl font-bold">
            {currentUser?.firstName ?? "Your"} profile
          </h3>
          <h5 className="text-sm">Update your personal information</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="py-2 relative col-span-2 md:col-span-1 ">
                <FormLabel className="font-sans  text-sm sm:text-base text-[#3a0e7b] pb-2">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled
                    className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
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
              <FormItem className="py-2 md:col-start-1 md:col-end-2 relative">
                <FormLabel className="font-sans text-sm text-[#3a0e7b]">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First Name"
                    className="border  bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
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
              <FormItem className="py-2 relative col-span-2 md:col-span-1">
                <FormLabel className="font-sans  text-sm sm:text-base text-[#3a0e7b] pb-2">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] absolute -bottom-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="py-2 relative col-span-2">
                <FormLabel className="font-sans  text-sm sm:text-base text-[#3a0e7b] pb-2">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] absolute -bottom-2" />
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
                <FormLabel className="font-sans  text-sm sm:text-base text-[#3a0e7b] pb-2">
                  Country
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Country"
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] absolute -bottom-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans  text-sm sm:text-base text-[#3a0e7b] pb-2">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="City"
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] absolute -bottom-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street1"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans  text-sm sm:text-base text-[#3a0e7b] pb-2">
                  Street
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Street"
                    className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] absolute -bottom-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street2"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans  text-sm sm:text-base text-[#3a0e7b] pb-2">
                  Apt
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] absolute -bottom-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem className="py-2 relative">
                <FormLabel className="font-sans  text-sm sm:text-base text-[#3a0e7b] pb-2">
                  Zipcode
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border bg-indigo-100 px-2 py-2 m-0 text-base text-indigo-900 border-indigo-200 focus:border-indigo-500 rounded transition-all duration-300 ease-in-out"
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d] absolute -bottom-2" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-6">
          <BlobButton text={isLoading ? "Loading" : "Submit"} />
        </div>
      </form>
    </Form>
  );
}

export default UserProfileForm;
