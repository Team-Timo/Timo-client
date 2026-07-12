import { Suspense } from "react";

import { OauthCallbackContainer } from "@/app/[locale]/oauth/callback/_containers/OauthCallbackContainer";

export default function OauthCallbackPage() {
  return (
    <Suspense>
      <OauthCallbackContainer />
    </Suspense>
  );
}
