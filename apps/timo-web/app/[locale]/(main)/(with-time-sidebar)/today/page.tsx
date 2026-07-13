import { TodayHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayHeaderContainer";
import { TodayTodoListContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoListContainer";

export default function TodayPage() {
  return (
    <div className="flex h-full flex-col">
      <TodayHeaderContainer />
      <section className="flex min-h-0 flex-1 flex-col px-20 pt-4">
        <TodayTodoListContainer />
      </section>
    </div>
  );
}
