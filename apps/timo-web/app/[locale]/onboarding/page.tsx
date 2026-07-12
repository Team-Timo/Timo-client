import { LottiePlayer } from "@/components/lottie/LottiePlayer";

export default function OnboardingPage() {
  return (
    <div className="relative h-screen w-full">
      <LottiePlayer
        src="/lottie/onboarding.json"
        className="absolute top-1/2 left-[197px] w-[500px] -translate-y-1/2"
      />
    </div>
  );
}
