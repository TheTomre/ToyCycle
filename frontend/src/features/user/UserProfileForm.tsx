import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "../../components/UI/avatar";
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
  const { user } = useAuth0();

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

  const inputStyles =
    "border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500";
  const lableStyles = "font-sans text-sm text-[#3a0e7b] relative top-1";
  const paddingsY = "py-2 relative";
  const errorValidation = "text-[#ff4d4d] absolute -bottom-2";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlerSubmit)}
        className="p-2 md:p:10 md:max-w-5xl mx-auto font-sans "
      >
        <div>
          <h3>{currentUser?.firstName ?? "Your"} profile</h3>
          <h5>Upadate your personal information</h5>
        </div>
        <div className="flex justify-between items-center gap-4 sm:gap-6">
          <Avatar className="hidden sm:block sm:flex-[1_1_0%] w-10 h-full sm:w-24 md:w-32  ">
            <AvatarImage src={user?.picture || "./assets/icons/avatar.svg"} />
            <AvatarFallback>
              <span className="block w-10 h-hull sm:w-24 md:w-32 p-0 bg-cover bg-norepeat bg-[url('./assets/icons/avatar.svg')]" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-col flex-[3_1_0%]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={paddingsY}>
                  <FormLabel className={lableStyles}>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className={inputStyles} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={paddingsY}>
                  <FormLabel className={lableStyles}>First name</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputStyles} />
                  </FormControl>
                  <FormMessage className={errorValidation} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className={paddingsY}>
                  <FormLabel className={lableStyles}>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputStyles} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>Bio</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h5 className="uppercase font-semibold text-[#3a0e7b] pt-4 ">
          Address
        </h5>
        <div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>Country</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>City</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="street1"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>Address 1</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street2"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>Address 2</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="zipcode"
          render={({ field }) => (
            <FormItem className={paddingsY}>
              <FormLabel className={lableStyles}>Zipcode</FormLabel>
              <FormControl>
                <Input {...field} className={inputStyles} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? "animate-spin" : ""} bg-[#3a0e7b] font-mono px-6 py-3 text-white ] hover:bg-[#4e2a85]`}
        >
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default UserProfileForm;
