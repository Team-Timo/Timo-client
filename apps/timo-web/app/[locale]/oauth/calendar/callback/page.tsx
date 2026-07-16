import { CalendarCallbackContainer } from "@/app/[locale]/oauth/calendar/callback/_containers/CalendarCallbackContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";

export default function CalendarCallbackPage() {
  return (
    <AsyncBoundary>
      <CalendarCallbackContainer />
    </AsyncBoundary>
  );
}
