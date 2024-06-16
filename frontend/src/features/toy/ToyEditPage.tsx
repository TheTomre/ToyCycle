import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ToyFormDetails from "./Form/ToyFormDetails";
import ToyFormCategories from "./Form/ToyFormCategories";
import ToyFormImage from "./Form/ToyFormImage";
import { Form } from "../../components/UI/form";
import { Button } from "../../components/UI/button";
import { Toy } from "./toyTypes";
import { API_BASE_URL, ENDPOINT } from "../../lib/consts";

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
  name: z
    .string()
    .min(1, "Name is required")
    .max(120, "Name must be less than 120 characters"),
  brand: z
    .string()
    .min(1, "Brand is required")
    .max(120, "Brand must be less than 120 characters"),
  description: z
    .string()
    .min(10, "Description is required")
    .max(220, "Description must be less than 220 characters"),
  fullDescription: z
    .string()
    .min(50, "Full Description is required")
    .max(500, "Full Description must be less than 500 characters"),
  condition: z.string().min(1, "Condition is required"),
  origin: z
    .string()
    .min(1, "Origin is required")
    .max(120, "Origin must be less than 120 characters"),
  price: z.coerce
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be a positive number" })
    .min(0, "Price cannot be negative"),
  quantity: z.coerce
    .number({ required_error: "Quantity is required" })
    .positive({ message: "Quantity must be a positive number" })
    .min(0, "Quantity cannot be negative"),
  tokenValue: z.coerce
    .number({ required_error: "Token value is required" })
    .positive({ message: "Token value must be a positive number" })
    .min(0, "Token value cannot be negative"),
  ageCategory: z
    .array(z.string())
    .nonempty({ message: "Please select at least one age category" }),
  category: z
    .array(z.string())
    .nonempty({ message: "Please select at least one category" }),
  images: z
    .array(z.instanceof(File, { message: "Image is required" }))
    .min(1, { message: "Please select at least one image" })
    .max(3, { message: "Max 3 images allowed" })
    .nonempty({ message: "Please select at least one image" })
});

type ToyFormData = z.infer<typeof formToySchema>;

function ToyEditPage() {
  const { id } = useParams();
  const [toy, setToy] = useState<Toy | null>(null);

  useEffect(() => {
    const fetchToy = async () => {
      const response = await fetch(`${API_BASE_URL}${ENDPOINT.toys}/${id}`);
      const data = await response.json();
      setToy(data.data);
    };

    fetchToy();
  }, [id]);

  const form = useForm<ToyFormData>({
    resolver: zodResolver(formToySchema),
    defaultValues: { ...initData }
  });

  useEffect(() => {
    if (toy) {
      form.reset({
        ...toy,
        images: toy.images.map(image => new File([], image))
      });
    }
  }, [toy, form]);

  const onSubmit = async (formDataJson: ToyFormData) => {
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

    await fetch(`${API_BASE_URL}${ENDPOINT.toys}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: formData
    });

    // Handle success or error
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-4 md:max-w-3xl mx-auto space-y-6"
      >
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-t-lg">
          <h3 className="text-xl font-bold">Edit Toy Details</h3>
          <h5 className="text-sm">
            Update the details of the toy you want to edit.
          </h5>
        </div>
        <ToyFormDetails />
        <ToyFormCategories />
        <ToyFormImage />
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ToyEditPage;