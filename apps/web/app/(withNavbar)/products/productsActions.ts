"use server";

import { propsFormState } from "@/app/props/forms/propsFormState";
import { apiURL, getApiCall } from "@/app/service/api_calls";
import api_routes from "@/app/service/api_routes";
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
}

export async function updateProduct(prevState: propsFormState, formData: FormData) {
    const result = productSchema.safeParse(Object.fromEntries(formData));
    const id = formData.get("id");
    const currentImageUrl = formData.get("currentImageUrl");
    const cleanFormData = new FormData();

    if (!result.success) {
        return {
            errors: Object.values(result.error.flatten().fieldErrors)
                .flat()
                .join(". ") // Combine all errors into a single string,
        };
    }

    for (const [key, value] of formData.entries()) {
        if (key === "id" || key === "currentImageUrl") continue;

        if (key === "url") {
            if ((value as File).size > 0) {
                // ✅ If a new file is selected, use it
                cleanFormData.append(key, value);
            } else if (currentImageUrl) {
                // ✅ If no new file but there's an existing image URL, send it
                cleanFormData.append(key, currentImageUrl);
            }
        } else {
            cleanFormData.append(key, value);
        }
    }

    console.log("FormData before send: ", cleanFormData)

    const response = await getApiCall(`${apiURL}${api_routes.products}/${id}`, {
        method: "PUT",
        body: cleanFormData,
    });

    console.log("API response:", response);
}

export async function deleteProduct(id: number) {
    await getApiCall(`${apiURL}${api_routes.products}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });
}