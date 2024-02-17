import { create } from "zustand";
import { auth } from "~/lib/firebase";

export const useMainStore = create(() => ({
  user: auth.currentUser,
}));
