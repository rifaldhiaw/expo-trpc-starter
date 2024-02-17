import { router, publicProcedure } from "../trpcServer";
import { z } from "zod";

export const userRouter = router({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return {
        id: input.id,
        name: "John Doe",
        firebaseUid: ctx.user?.user_id ?? "not logged in",
      };
    }),
});
