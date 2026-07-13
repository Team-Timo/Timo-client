import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  onboardingCompleted: boolean;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setOnboardingCompleted: (completed: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set): AuthState => ({
      accessToken: null,
      onboardingCompleted: false,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
      setOnboardingCompleted: (completed) =>
        set({ onboardingCompleted: completed }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        onboardingCompleted: state.onboardingCompleted,
      }),
      // 과거 버전에서 localStorage에 accessToken까지 저장했던 사용자가 남아있을 수 있다.
      // 기본 merge(...persistedState)를 쓰면 그 잔여 accessToken이 되살아나므로
      // onboardingCompleted만 명시적으로 골라 merge한다.
      merge: (persistedState, currentState) => ({
        ...currentState,
        onboardingCompleted:
          (persistedState as Partial<AuthState> | undefined)
            ?.onboardingCompleted ?? currentState.onboardingCompleted,
      }),
    },
  ),
);
