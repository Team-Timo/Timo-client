"use client";

import timoTextLogo from "@repo/timo-design-system/assets/images/logo/timo-text-logo.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { OnboardingGoogleButtonContainer } from "@/app/[locale]/onboarding/_containers/OnboardingGoogleButtonContainer";
import { LottiePlayer } from "@/components/lottie/LottiePlayer";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

export const LoginContainer = () => {
  const t = useTranslations("Login");

  return (
    <section className="flex min-h-screen items-center justify-center gap-10 bg-white px-8 lg:gap-16 xl:gap-36 2xl:gap-[225px]">
      <LottiePlayer
        src="/lottie/onboarding.json"
        className="hidden shrink-0 lg:block lg:size-[350px] xl:size-[430px] 2xl:size-[500px]"
        ariaLabel={t("animationLabel")}
      />

      <div className="border-timo-gray-500 shadow-timo flex flex-col items-center justify-center gap-16 rounded-[4px] border bg-white px-12.5 py-13">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <Image src={timoTextLogo} alt="Timo" width={92} height={35} />
            <div className="flex w-full flex-col items-center gap-0.5">
              <p className="typo-headline-m-16 text-timo-blue-300">
                Less Chaos More Focus
              </p>
              <span className="typo-headline-b-18 text-timo-black">
                {t("headline")}
              </span>
            </div>
          </div>
          <p className="typo-headline-m-14 text-timo-gray-700 text-center">
            {t("description")}
          </p>
        </div>

        <div className="flex w-76.25 flex-col gap-5.5">
          <div className="flex flex-col gap-2">
            <p className="typo-body-r-12 text-timo-gray-700">
              {t("connectLabel")}
            </p>
            <OnboardingGoogleButtonContainer
              variant="login"
              onClick={() => {
                window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`;
              }}
            />
          </div>

          <p className="typo-body-r-12 text-timo-gray-700 text-center">
            {t.rich("termsNotice", {
              terms: (chunks) => (
                <Link
                  href={`${ROUTES.POLICY}?type=SERVICE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {chunks}
                </Link>
              ),
              privacy: (chunks) => (
                <Link
                  href={`${ROUTES.POLICY}?type=PRIVACY`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </div>
    </section>
  );
};
