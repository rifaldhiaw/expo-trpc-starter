// @ts-ignore
import { verifyIdToken } from "web-auth-library/google";
import { MiddlewareHandler } from "hono";
import { env, getRuntimeKey } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { HonoType } from "..";

export const authMiddleware: MiddlewareHandler<HonoType> = async (c, next) => {
  const idToken = c.req.header("authorization")?.match(/^Bearer (\S+)/)?.[1];

  if (!idToken) {
    c.set("user", null);
    return await next();
  }

  try {
    const user = await verifyIdToken({
      idToken: idToken,
      waitUntil:
        getRuntimeKey() === "workerd" ? c.executionCtx.waitUntil : undefined,
      projectId: env(c).FIREBASE_PROJECT_ID,
    });

    c.set("user", user);
  } catch (error) {
    const newErrorMessages = "Failed to verify firebase token";

    console.error(newErrorMessages, error);
    throw new HTTPException(500, {
      message: newErrorMessages,
    });
  }

  await next();
};
