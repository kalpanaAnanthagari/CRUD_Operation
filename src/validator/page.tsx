import{ z }from 'zod';

export const addProductSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.string()
      .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid price format" })
      .refine(value => parseFloat(value) > 0, { message: "Price must be greater than zero" }),
    image: z.string().url({ message: "Invalid image URL" }),
  });