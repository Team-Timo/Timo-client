import { TodayHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayHeaderContainer";
import { TodayTodoListContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoListContainer";

export default function TodayPage() {
  return (
    <section>
      <TodayHeaderContainer />
      <div className="p-4">
        <TodayTodoListContainer />
      </div>
    </section>
  );
}
