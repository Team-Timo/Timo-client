import { FocusSessionContainer } from "@/app/[locale]/(main)/focus/_containers/FocusSessionContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";

export default function FocusPage() {
  return (
    <AsyncBoundary>
      <FocusSessionContainer />
    </AsyncBoundary>
  );
}
