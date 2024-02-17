import { router, publicProcedure } from "../trpcServer";
import { z } from "zod";

export const userRouter = router({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        id: input.id,
        name: "John Doe",
      };
    }),
});
