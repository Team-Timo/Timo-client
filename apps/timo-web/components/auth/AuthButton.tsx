import googleLogo from "@repo/timo-design-system/assets/images/google-logo.svg";
import { cn } from "@repo/timo-design-system/utils";
import Image from "next/image";

import type { StaticImageData } from "next/image";

export type AuthButtonVariant = "googleLogin" | "googleCalendar";

const AUTH_BUTTON_LOGO: Record<
  AuthButtonVariant,
  { src: StaticImageData; alt: string }
> = {
  googleLogin: { src: googleLogo, alt: "Google" },
  googleCalendar: { src: googleLogo, alt: "Google" },
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
  const logo = AUTH_BUTTON_LOGO[variant];

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
          <Image src={logo.src} alt={logo.alt} width={18} height={18} />
        </div>
        <span className="typo-headline-m-16 text-timo-blue-300">{label}</span>
      </div>
    </button>
  );
};
