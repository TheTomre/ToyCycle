import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../../components/UI/form";
import ToyFormDetails from "./ToyFormDetails";
import ToyFormCategories from "./ToyFormCategories";
import ToyFormImage from "./ToyFormImage";
import { Button } from "../../../components/UI/button";

const formToySchema = z.object({
  name: z.string({
    required_error: "toy name is required"
  }),
  brand: z.string({
    required_error: "brand is required"
  }),
  description: z.string({
    required_error: "description is required"
  }),
  fullDescription: z.string({
    required_error: "full description is required"
  }),
  condition: z.string({
    required_error: "condition is required"
  }),
  origin: z.string({
    required_error: "Origin is required"
  }),
  price: z.coerce.number({
    required_error: "price is required",
    invalid_type_error: "must be a valid number"
  }),
  quantity: z.coerce
    .number({
      required_error: "quantity is required",
      invalid_type_error: "must be a valid number"
    })
    .positive(),
  tokenValue: z.coerce.number({
    required_error: "token value time is required",
    invalid_type_error: "must be a valid number"
  }),
  ageCategory: z.array(z.string()).nonempty({
    message: "please select at least one item"
  }),
  category: z.array(z.string()).nonempty({
    message: "please select at least one item"
  }),
  images: z
    .array(z.instanceof(File, { message: "image is required" }))
    .nonempty({
      message: "please select at least one item"
    })
});

type ToyFormData = z.infer<typeof formToySchema>;

type Props = {
  // toy?: ToyFormData;
  onSave: (toyFormData: FormData) => void;
  // isLoading: boolean;
};

function ToyCreateForm({ onSave }: Props) {
  const form = useForm<ToyFormData>({
    resolver: zodResolver(formToySchema),
    defaultValues: {
      ageCategory: [],
      category: []
    }
  });
  const onSubmit = (formDataJson: ToyFormData) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("quantity", formDataJson.quantity.toString());
    formData.append("description", formDataJson.description);
    formData.append("brand", formDataJson.brand);
    formData.append("status", "available");
    formData.append("condition", formDataJson.condition);
    formData.append("origin", formDataJson.origin);
    formData.append("price", formDataJson.price.toString());
    formData.append("tokenValue", formDataJson.tokenValue.toString());
    formData.append("fullDescription", formDataJson.fullDescription);

    formDataJson.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    formDataJson.ageCategory.forEach((ageCategory, index) => {
      formData.append(`ageCategory[${index}]`, ageCategory);
    });
    formDataJson.category.forEach((category, index) => {
      formData.append(`category[${index}]`, category);
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
        <Button type="submit">sd</Button>
      </form>
    </Form>
  );
}

export default ToyCreateForm;
