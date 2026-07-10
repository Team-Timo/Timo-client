import { LottiePlayer } from "@/components/lottie/LottiePlayer";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <LottiePlayer
        src="/lottie/loading.json"
        className="w-[143px]"
        ariaLabel="로딩 중"
      />
    </div>
  );
}
