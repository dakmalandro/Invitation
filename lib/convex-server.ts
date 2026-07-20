import { ConvexHttpClient } from "convex/browser";

let client: ConvexHttpClient | null = null;

export function getConvexClient() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is not set. Run `npx convex dev` to create a Convex project and populate .env.local.",
    );
  }
  if (!client) {
    client = new ConvexHttpClient(url);
  }
  return client;
}
