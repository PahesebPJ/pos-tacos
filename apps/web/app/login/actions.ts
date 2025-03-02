"use server"

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

//API
import { apiURL, getApiCall } from "../service/api_calls";
import api_routes from "../service/api_routes";

const URL = apiURL;

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).trim(),
});

export async function login(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { email, password } = result.data;

    const data = await getApiCall(URL + api_routes.login, {
        headers: {"Content-Type": "application/json"},
        method: "POST", 
        body: JSON.stringify({email: email, password: password})
    });

    if (data?.error) {
        return {
          errors: {
            email: [data?.message],
          },
        };
    } 
    
    await createSession({ id: data.user.id, name: data.user.name, email: data.user.email, token: data.token });

    redirect("/");
}

export async function logout() {
    await deleteSession();
    redirect("/login");
}