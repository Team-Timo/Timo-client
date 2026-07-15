import { TodayHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayHeaderContainer";
import { TodayTodoListContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoListContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";

export default function TodayPage() {
  return (
    <div className="flex h-full flex-col">
      <TodayHeaderContainer />
      <section className="flex min-h-0 flex-1 flex-col overflow-x-auto px-20 pt-4">
        <div className="h-full min-w-[400px]">
          <AsyncBoundary>
            <TodayTodoListContainer />
          </AsyncBoundary>
        </div>
      </section>
    </div>
  );
}
