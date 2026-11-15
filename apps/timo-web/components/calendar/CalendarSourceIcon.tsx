import Image from "next/image";

import type { CalendarSource } from "@/schemas/todo/todo-schema";

interface CalendarSourceIconProps {
  source: CalendarSource;
}

export const CalendarSourceIcon = ({ source }: CalendarSourceIconProps) => (
  <span className="flex size-6 shrink-0 items-center justify-center">
    {source === "GOOGLE" ? (
      <Image
        src="/images/google-calendar.png"
        alt="Google Calendar"
        width={14}
        height={14}
        className="size-3.5 object-cover"
      />
    ) : (
      <span className="relative size-4 overflow-hidden">
        <Image
          src="/images/apple-calendar.png"
          alt="Apple Calendar"
          width={16}
          height={16}
          className="absolute top-[-1.85%] left-[-1.85%] size-[103.7%] max-w-none"
        />
      </span>
    )}
  </span>
);
