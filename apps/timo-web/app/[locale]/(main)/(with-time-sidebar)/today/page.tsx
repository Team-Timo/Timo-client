import { TodayHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayHeaderContainer";
import { TodayTodoCardContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_containers/TodayTodoCardContainer";
// TODO: API 연결 후 mock 데이터 제거
import { todayTodoMock } from "@/app/[locale]/(main)/(with-time-sidebar)/today/_mocks/today-todo-mock";

export default function TodayPage() {
  return (
    <section>
      <TodayHeaderContainer />
      <div className="p-4">
        <TodayTodoCardContainer {...todayTodoMock} />
      </div>
    </section>
  );
}
