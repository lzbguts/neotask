import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    apikey: process.env.API_ANON_KEY,
    Authorization: `Bearer ${process.env.API_ANON_KEY}`,
  },
});
