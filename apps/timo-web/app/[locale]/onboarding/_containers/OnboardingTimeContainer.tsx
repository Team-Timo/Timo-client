"use client";

import { useState } from "react";

import { OnboardingTimeDropdown } from "@/app/[locale]/onboarding/_components/OnboardingTimeDropdown";

export const OnboardingTimeContainer = () => {
  const [time, setTime] = useState("");

  return (
    <OnboardingTimeDropdown
      value={time}
      placeholder="01:00"
      onChange={setTime}
    />
  );
};
