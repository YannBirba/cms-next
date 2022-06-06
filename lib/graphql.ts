import { type SSRExchange } from "@urql/core/dist/types/exchanges/ssr";
import {
  type Client,
  createClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";

const url: string | null = process.env.NEXT_PUBLIC_API_URL ?? null;

if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not set");
}

const isServerSide: boolean = typeof window === "undefined";
const ssrCache: SSRExchange = ssrExchange({ isClient: !isServerSide });

const client: Client = createClient({
  url,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  fetchOptions: () => {
    return { headers: {} };
  },
});

export { client, ssrCache };
