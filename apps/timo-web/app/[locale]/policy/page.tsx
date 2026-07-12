import timoTextLogo from "@repo/timo-design-system/assets/images/logo/timo-text-logo.svg";
import Image from "next/image";

import type { TermsType } from "@/types/terms-type";

import { PolicyContainer } from "@/app/[locale]/policy/_containers/PolicyContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

const isTermsType = (value: string | undefined): value is TermsType =>
  value === "SERVICE" || value === "PRIVACY";

interface PolicyPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function PolicyPage({ searchParams }: PolicyPageProps) {
  const { type } = await searchParams;

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-12.5 bg-white">
      <div className="flex w-full items-center justify-between px-37 py-6.75">
        <Link href={ROUTES.LOGIN}>
          <Image src={timoTextLogo} alt="Timo" width={92} height={35} />
        </Link>
      </div>

      <div className="flex w-full justify-center px-8 pb-20">
        <AsyncBoundary>
          <PolicyContainer type={isTermsType(type) ? type : "SERVICE"} />
        </AsyncBoundary>
      </div>
    </div>
  );
}
