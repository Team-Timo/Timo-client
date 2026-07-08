import {
  ChevronSmallLeftIcon,
  ChevronSmallRightIcon,
  ChevronSmallRightWhiteIcon,
} from "@repo/timo-design-system/icons";
import { cn } from "@repo/timo-design-system/utils";

export type OnboardingButtonVariant =
  | "다음"
  | "다음_활성화"
  | "이전"
  | "시작하기"
  | "시작하기_비활성";

export interface OnboardingButtonProps {
  variant: OnboardingButtonVariant;
  onClick?: () => void;
}

const LABEL: Record<OnboardingButtonVariant, string> = {
  다음: "다음",
  다음_활성화: "다음",
  이전: "이전",
  시작하기: "시작하기",
  시작하기_비활성: "시작하기",
};

export const OnboardingButton = ({
  variant,
  onClick,
}: OnboardingButtonProps) => {
  const active = variant === "다음_활성화" || variant === "시작하기";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-[4px] px-4 py-2",
        active ? "bg-timo-blue-300" : "bg-timo-gray-200",
      )}
    >
      {variant === "이전" && <ChevronSmallLeftIcon />}
      <span
        className={cn(
          "typo-headline-m-16",
          active ? "text-white" : "text-timo-gray-700",
        )}
      >
        {LABEL[variant]}
      </span>
      {variant === "다음" && <ChevronSmallRightIcon />}
      {variant === "다음_활성화" && <ChevronSmallRightWhiteIcon />}
    </button>
  );
};
