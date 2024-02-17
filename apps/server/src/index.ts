import { greet } from "shared";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { trpcRouter } from "./trpcRouter";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({ message: greet("World") });
});

app.use("/trpc/*", async (c) => {
  const res = fetchRequestHandler({
    router: trpcRouter,
    endpoint: "/trpc",
    req: c.req.raw,
    createContext: () => ({}),
  });

  return res;
});

export default app;
