import { z } from "zod";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("propfi_token") : null;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options?.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "API request failed");
  }

  return response.json();
};

export const api = {
  properties: {
    list: () => fetcher<any[]>("/properties"),
    get: (id: string) => fetcher<any>(`/properties/${id}`),
    create: (data: any) => fetcher<any>("/properties", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  },
  auth: {
    login: (address: string, signature: string) => fetcher<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ address, signature }),
    }),
  }
};
