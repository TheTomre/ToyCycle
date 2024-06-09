import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const fromUserSchema = z.object({
  email: z.string().optional(),
  bio: z.string().min(1).max(120).optional(),
  firstName: z.string().min(1, "User first name is required").max(120),
  lastName: z.string().min(1, "User last name is required").max(120),
  avatar: z.string().optional(),
  lastActive: z.string().optional(),
  tokenBalance: z.number().positive().optional(),
  address: z.object({
    city: z.string().min(1, "City is required").max(120),
    country: z.string().min(1, "Country is required").max(120),
    street1: z.string().min(1, "Address is required").max(120),
    street2: z.string().optional(),
    zipcode: z.string().min(1, "Zipcode is required").max(50)
  })
});

type UserFormSchema = z.infer<typeof fromUserSchema>;

type UserProfileFormProps = {
  onSave: (data: UserFormSchema) => void;
  isLoading: boolean;
};

function UserProfileForm({ isLoading, onSave }: UserProfileFormProps) {
  const { user } = useAuth0();
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(fromUserSchema)
  });
  const inputStyles =
    "border bg-indigo-100 px-2 py-2 m-0 border-indigo-200 focus:border-indigo-500";
  const lableStyles = "font-sans text-sm text-[#3a0e7b] relative top-1";
  const paddingsY = "py-2 relative";
  const errorValidation = "text-[#ff4d4d] absolute -bottom-2";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="p-2 md:p:10 md:max-w-5xl mx-auto font-sans "
      >
        <div>
          <h3>{user?.name ?? "Your"} profile</h3>
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
            name="address.country"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>Country</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>City</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="address.street1"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>Address 1</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.street2"
            render={({ field }) => (
              <FormItem className={paddingsY}>
                <FormLabel className={lableStyles}>Address 2</FormLabel>
                <FormControl>
                  <Input {...field} className={inputStyles} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address.zipcode"
          render={({ field }) => (
            <FormItem className={paddingsY}>
              <FormLabel className={lableStyles}>Zipcode</FormLabel>
              <FormControl>
                <Input {...field} className={inputStyles} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? "animate-spin" : ""} bg-[#3a0e7b] font-mono px-6 py-3 text-white hover:text-[#fff24f] hover:bg-[#280b5f]`}
        >
          {isLoading ? "Submit" : "Loading"}
        </Button>
      </form>
    </Form>
  );
}

export default UserProfileForm;
