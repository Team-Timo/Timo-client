import { OauthCallbackContainer } from "@/app/[locale]/oauth/callback/_containers/OauthCallbackContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";

export default function OauthCallbackPage() {
  return (
    <AsyncBoundary>
      <OauthCallbackContainer />
    </AsyncBoundary>
  );
}
