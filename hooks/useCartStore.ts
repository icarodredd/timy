import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  offers: number[];
  addToCart: (offerId: number) => void;
  removeFromCart: (offerId: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      offers: [],
      addToCart: (offerId: number) =>
        set({ offers: [...get().offers, offerId] }),
      removeFromCart: (offerId: number) =>
        set({ offers: [...get().offers.filter((id) => id !== offerId)] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
