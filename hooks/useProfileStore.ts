import { ProfileFormValues } from "@/app/profile/page";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProfileStore {
  profile: ProfileFormValues;
  addValues: (values: ProfileFormValues) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        name: "",
        email: "",
        phoneNumber: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
      },
      addValues: (values: ProfileFormValues) => set({ profile: values }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
