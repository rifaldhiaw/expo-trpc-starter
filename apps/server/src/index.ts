import type { UserToken } from "web-auth-library/dist/google";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { logger } from "hono/logger";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { trpcRouter } from "./trpcRouter";
import { greet } from "shared";
import { authMiddleware } from "./middlewares/authMiddleware";

export type HonoType = {
  Variables: {
    user: UserToken | null;
  };
  Bindings: {
    FIREBASE_PROJECT_ID: string;
  };
};

export type TrpcContext = {
  user: UserToken | null;
  env: HonoType["Bindings"];
};

const app = new Hono<HonoType>();

app.use("*", logger());
app.use("*", authMiddleware);

app.get("/", (c) => {
  return c.json({
    message: greet("World"),
  });
});

app.use("/trpc/*", async (c) => {
  const res = fetchRequestHandler({
    router: trpcRouter,
    endpoint: "/trpc",
    req: c.req.raw,
    createContext: (): TrpcContext => ({
      user: c.get("user"),
      env: env(c),
    }),
  });

  return res;
});

export default app;
