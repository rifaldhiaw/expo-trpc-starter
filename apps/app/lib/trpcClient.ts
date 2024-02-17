import type { TrpcRouter } from "../../server/src/trpcRouter";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<TrpcRouter>();
