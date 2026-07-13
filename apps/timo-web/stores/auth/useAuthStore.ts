import { create } from "zustand";

import {
  clearAccessToken as clearStoredAccessToken,
  clearOnboardingCompleted as clearStoredOnboardingCompleted,
  getAccessToken,
  getOnboardingCompleted,
  setAccessToken as setStoredAccessToken,
  setOnboardingCompleted as setStoredOnboardingCompleted,
} from "@/utils/auth/token-manager";

interface AuthState {
  accessToken: string | null;
  onboardingCompleted: boolean;
  isInitialized: boolean;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setOnboardingCompleted: (completed: boolean) => void;
  setInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: getAccessToken(),
  onboardingCompleted: getOnboardingCompleted(),
  isInitialized: false,
  setAccessToken: (token) => {
    setStoredAccessToken(token);
    set({ accessToken: token });
  },
  clearAccessToken: () => {
    clearStoredAccessToken();
    clearStoredOnboardingCompleted();
    set({ accessToken: null, onboardingCompleted: false });
  },
  setOnboardingCompleted: (completed) => {
    setStoredOnboardingCompleted(completed);
    set({ onboardingCompleted: completed });
  },
  setInitialized: (value) => set({ isInitialized: value }),
}));
