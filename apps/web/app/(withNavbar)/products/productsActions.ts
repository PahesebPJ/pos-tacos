import { propsFormState } from "@/app/props/forms/propsFormState";
import { apiURL, getApiCall } from "@/app/service/api_calls";
import api_routes from "@/app/service/api_routes";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(1, { message: "El nombre no puede estar vacio" }),
    price: z.string().min(1, { message: "El precio no puede estar vacio" }),
    description: z.string().optional(),
    type: z.string().optional(),
    url: z
    .instanceof(File)
    .optional()
})

export async function createProduct(prevState: propsFormState, formData: FormData){
    const result = productSchema.safeParse(Object.fromEntries(formData));
    if(!result.success) {
        return {
            errors: Object.values(result.error.flatten().fieldErrors)
            .flat()
            .join(". ") // Combine all errors into a single string,
        }
    }

    await getApiCall(apiURL + api_routes.products, {
        method: "POST",
        body: formData,
    });

    redirect("/products");
}