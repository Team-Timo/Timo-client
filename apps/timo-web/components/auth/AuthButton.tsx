import { cn } from "@repo/timo-design-system/utils";
import Image from "next/image";

export type AuthButtonVariant =
  | "googleLogin"
  | "googleCalendar"
  | "appleCalendar";

const AUTH_BUTTON_LOGO: Record<
  AuthButtonVariant,
  { src: string; alt: string }
> = {
  googleLogin: { src: "/images/google-login.svg", alt: "Google" },
  googleCalendar: {
    src: "/images/google-calendar.svg",
    alt: "Google Calendar",
  },
  appleCalendar: { src: "/images/apple-calendar.svg", alt: "Apple Calendar" },
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
        <Image src={logo.src} alt={logo.alt} width={24} height={24} />
        <span className="typo-headline-m-16 text-timo-blue-300">{label}</span>
      </div>
    </button>
  );
};
