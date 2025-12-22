// lib/serverFetch.js
import { headers } from "next/headers";

export function getBaseUrl() {
  const headersList = headers();
  const host = headersList.get("host");

  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${host}`;
}

export async function serverFetch(path, options = {}) {
  const baseUrl = getBaseUrl();

  return fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
}
