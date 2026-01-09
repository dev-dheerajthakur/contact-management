"use server";

import { api } from "@/app/axios/api";
import { AxiosError } from "axios";

export async function getContacts() {
  try {
    const res = await api.get("/contacts");
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      error: err.response?.data.message,
    };
  }
}
