"use server";

import axios from "axios";
const baseUrl = process.env.SERVER_URL ?? "http://localhost:5000";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
