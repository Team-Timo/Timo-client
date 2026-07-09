"use client";

import { useState } from "react";

import { OnboardingTimeDropdown } from "../_components/OnboardingTimeDropdown";

export const OnboardingTimeField = () => {
  const [time, setTime] = useState("");

  return (
    <OnboardingTimeDropdown
      value={time}
      placeholder="01:00"
      onChange={setTime}
    />
  );
};
