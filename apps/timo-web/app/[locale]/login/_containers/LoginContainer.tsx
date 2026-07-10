"use client";

import timoTextLogo from "@repo/timo-design-system/assets/images/logo/timo-text-logo.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { OnboardingGoogleButtonContainer } from "@/app/[locale]/onboarding/_containers/OnboardingGoogleButtonContainer";

export const LoginContainer = () => {
  const t = useTranslations("Login");

  return (
    <div className="flex min-h-screen items-center justify-center gap-16 bg-white">
      {/* TODO: PR#131(feat/web/130-status-screen-lottie) 병합 후 온보딩 Lottie 그래픽으로 교체 */}
      <div className="size-55" />

      <div className="border-timo-gray-500 shadow-timo flex h-110 w-101 flex-col items-center justify-center gap-16 rounded-[4px] border bg-white px-12.5 py-13">
        <div className="flex w-76 flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <Image src={timoTextLogo} alt="Timo" width={92} height={35} />
            <div className="flex w-full flex-col items-center gap-0.5">
              <span className="typo-headline-m-16 text-timo-blue-300">
                Less Chaos More Focus
              </span>
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
                // TODO: 백엔드 OAuth 로그인 URL 확정 후 리다이렉트
              }}
            />
          </div>

          <p className="typo-body-r-12 text-timo-gray-700 text-center">
            {t.rich("termsNotice", {
              // TODO: 실제 이용약관 페이지 URL 나오면 href 교체
              terms: (chunks) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#" className="underline">
                  {chunks}
                </a>
              ),
              // TODO: 실제 개인정보 처리방침 페이지 URL 나오면 href 교체
              privacy: (chunks) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#" className="underline">
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
