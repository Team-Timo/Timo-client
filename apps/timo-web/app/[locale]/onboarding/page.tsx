import { OnboardingFunnelContainer } from "@/app/[locale]/onboarding/_containers/OnboardingFunnelContainer";
import { AuthGuardProvider } from "@/providers/auth/AuthGuardProvider";

export default function OnboardingPage() {
  return (
    <AuthGuardProvider redirectIfOnboardingCompleted>
      <OnboardingFunnelContainer />
    </AuthGuardProvider>
  );
}
