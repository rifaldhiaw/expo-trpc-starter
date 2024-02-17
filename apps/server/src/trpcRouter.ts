import { userRouter } from "./trpcRouters/userRouter";
import { router } from "./trpcServer";

export const trpcRouter = router({
  user: userRouter,
});

export type TrpcRouter = typeof trpcRouter;
