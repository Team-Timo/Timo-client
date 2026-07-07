import { TodayHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayHeaderContainer";
import { todayTodoMock } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";
import { TodayTodoCard } from "@/app/[locale]/(main)/today/_components/TodayTodoCard";

export default function TodayPage() {
  return (
    <>
      <TodayHeaderContainer />
      <div className="p-4">
        <TodayTodoCard {...todayTodoMock} />
      </div>
    </>
  );
}
