import timoTextLogo from "@repo/timo-design-system/assets/images/logo/timo-text-logo.svg";
import Image from "next/image";

import { PolicyContainer } from "@/app/[locale]/policy/_containers/PolicyContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { termsTypeSchema } from "@/types/terms-type";

interface PolicyPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function PolicyPage({ searchParams }: PolicyPageProps) {
  const { type } = await searchParams;
  const parsedType = termsTypeSchema.safeParse(type);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-12.5 bg-white">
      <div className="flex w-full items-center justify-between px-37 py-6.75">
        <Link href={ROUTES.LOGIN}>
          <Image src={timoTextLogo} alt="Timo" width={92} height={35} />
        </Link>
      </div>

      <div className="flex w-full justify-center px-8 pb-20">
        <AsyncBoundary>
          <PolicyContainer
            type={parsedType.success ? parsedType.data : "SERVICE"}
          />
        </AsyncBoundary>
      </div>
    </div>
  );
}
