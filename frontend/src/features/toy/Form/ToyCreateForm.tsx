import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../../components/UI/form";
import ToyFormDetails from "./ToyFormDetails";
import ToyFormCategories from "./ToyFormCategories";
import ToyFormImage from "./ToyFormImage";
import { Button } from "../../../components/UI/button";

const initData = {
  name: "",
  brand: "",
  description: "",
  fullDescription: "",
  condition: "",
  origin: "",
  price: 0,
  quantity: 0,
  tokenValue: 0,
  ageCategory: [],
  category: [],
  images: []
};

const formToySchema = z.object({
  name: z.string().min(1, "name is required").max(120),
  brand: z.string().min(1, "brand is required").max(120),
  description: z.string().min(10, "description is required").max(220),
  fullDescription: z.string().min(50, "fullDescription is required").max(500),
  condition: z.string().min(1, "condition is required"),
  origin: z.string().min(1, "origin is required").max(120),
  price: z.coerce
    .number({
      required_error: "price is required"
    })
    .positive({ message: "must be a positive number" }),
  quantity: z.coerce
    .number({
      required_error: "quantity is required"
    })
    .positive({ message: "must be a positive number" }),
  tokenValue: z.coerce
    .number({
      required_error: "token value time is required"
    })
    .positive({ message: "must be a positive number" }),
  ageCategory: z.array(z.string()).nonempty({
    message: "please select at least one item"
  }),
  category: z.array(z.string()).nonempty({
    message: "please select at least one item"
  }),
  images: z
    .array(z.instanceof(File, { message: "image is required" }))
    .min(1, { message: "please select at least one item" })
    .max(3, { message: "max 3 images" })
    .nonempty({
      message: "please select at least one item"
    })
});

type ToyFormData = z.infer<typeof formToySchema>;

type Props = {
  onSave: (toyFormData: FormData) => void;
};

function ToyCreateForm({ onSave }: Props) {
  const form = useForm<ToyFormData>({
    resolver: zodResolver(formToySchema),
    defaultValues: {
      ...initData
    }
  });

  const onSubmit = (formDataJson: ToyFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("quantity", formDataJson.quantity.toString());
    formData.append("description", formDataJson.description);
    formData.append("brand", formDataJson.brand);
    formData.append("condition", formDataJson.condition);
    formData.append("origin", formDataJson.origin);
    formData.append("price", formDataJson.price.toString());
    formData.append("tokenValue", formDataJson.tokenValue.toString());
    formData.append("fullDescription", formDataJson.fullDescription);

    formDataJson.ageCategory.forEach((ageCategory, index) => {
      formData.append(`ageCategory[${index}]`, ageCategory);
    });
    formDataJson.category.forEach((category, index) => {
      formData.append(`category[${index}]`, category);
    });

    Array.from(formDataJson.images).forEach(imageFile => {
      formData.append(`images`, imageFile);
    });

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-gray-50 py-10 px-4 sm:px-8 md:px-10 rounded-lg"
      >
        <ToyFormDetails />
        <ToyFormCategories />
        <ToyFormImage />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ToyCreateForm;
