import { OnboardingButton } from "./_components/OnboardingButton";
import { OnboardingGoogleButton } from "./_components/OnboardingGoogleButton";
import { OnboardingStepButton } from "./_components/OnboardingStepButton";
import { OnboardingTimeDropdown } from "./_components/OnboardingTimeDropdown";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col gap-10 bg-white p-10">
      <section className="flex flex-col gap-4">
        <h2 className="typo-headline-b-16">OnboardingButton</h2>
        <div className="flex flex-wrap gap-3">
          <OnboardingButton variant="prev" />
          <OnboardingButton variant="next" />
          <OnboardingButton variant="next_active" />
          <OnboardingButton variant="start" />
          <OnboardingButton variant="start_inactive" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="typo-headline-b-16">OnboardingGoogleButton</h2>
        <div className="flex flex-col gap-3">
          <OnboardingGoogleButton variant="login" />
          <OnboardingGoogleButton variant="login" isSelected />
          <OnboardingGoogleButton variant="connectCalendar" />
          <OnboardingGoogleButton variant="connectCalendar" isSelected />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="typo-headline-b-16">OnboardingStepButton</h2>
        <div className="flex flex-wrap gap-4">
          <OnboardingStepButton step={1} />
          <OnboardingStepButton step={2} />
          <OnboardingStepButton step={3} />
          <OnboardingStepButton step={4} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="typo-headline-b-16">OnboardingTimeDropdown</h2>
        <OnboardingTimeDropdown />
      </section>
    </div>
  );
}
