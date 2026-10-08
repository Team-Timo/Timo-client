import { cn } from "@repo/timo-design-system/utils";
import Image from "next/image";

export type AuthButtonVariant =
  | "googleLogin"
  | "googleCalendar"
  | "appleCalendar";

const AUTH_BUTTON_LOGO_SRC: Record<AuthButtonVariant, string> = {
  googleLogin: "/images/google-logo.png",
  googleCalendar: "/images/google-calendar.png",
  appleCalendar: "/images/apple-calendar.png",
};

interface AuthButtonProps {
  variant: AuthButtonVariant;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const AuthButton = ({
  variant,
  label,
  isSelected = false,
  onClick,
}: AuthButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center rounded-[4px] border py-2.5",
        "active:border-timo-blue-300 active:bg-timo-blue-50",
        isSelected
          ? "border-timo-blue-300 bg-timo-blue-50"
          : "border-timo-gray-500 bg-white",
      )}
    >
      <div className="flex items-center gap-2.5 px-2">
        <div className="flex size-[22px] items-center justify-center">
          <Image
            src={AUTH_BUTTON_LOGO_SRC[variant]}
            alt=""
            width={18}
            height={18}
            unoptimized
          />
        </div>
        <span className="typo-headline-m-16 text-timo-blue-300">{label}</span>
      </div>
    </button>
  );
};
