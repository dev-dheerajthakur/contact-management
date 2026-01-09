"use server";

import { api } from "@/app/axios/api";
import { FormState } from "@/app/components/ContactForm";
import { AxiosError } from "axios";
import z from "zod";

export async function formAction(state: FormState, formdata?: FormData): Promise<FormState> {
  "use server";
  const schema = z.object({
    name: z.string({message: 'Name required'}),
    email: z.email({message: 'Invalid Email !!'}),
    phone: z.string({message: 'Phone required'}).length(10, { message: "Invalid phone !!" }),
    bio: z.string().optional(),
  });
  
  try {
    const parseData = await schema.safeParseAsync({
      name: formdata?.get('name')?.toString().trim(),
      email: formdata?.get('email')?.toString().trim(),
      phone: formdata?.get('phone')?.toString().trim(),
      bio: formdata?.get('bio')?.toString().trim(),
    });
    if (parseData.success) {
      const res = await api.post("contacts", parseData.data);
      if (res.data.success) {
        return res.data;
      }
    }
    return {
      success: parseData.success,
      message: parseData.error?.issues[0].message
    };
  } catch (error) {
    const err = error as AxiosError<{message?: string}>;
    return {
      success: false,
      message: err.response?.data.message
    };
  }
}
