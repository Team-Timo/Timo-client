import { TodayTodoCard } from "./_components/TodayTodoCard";

export default function TodayPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
      {/* 1. 기본 (핸들 O, 미완료) */}
      <TodayTodoCard
        title="티모 하이파이 작업하기"
        isDone={false}
        isDraggable
        subTodos={[
          { id: "1", text: "티모 하이파이 열심히 제작하기" },
          { id: "2", text: "티모 하이파이 열심히 제작하기" },
        ]}
        date="26.07.01"
        time="02 : 00"
        priority="urgent"
        tag="일상"
        hasMemo
        hasRepeat
      />

      {/* 2. 핸들 없는 버전 (미완료) */}
      <TodayTodoCard
        title="티모 하이파이 작업하기"
        isDone={false}
        subTodos={[
          { id: "1", text: "티모 하이파이 열심히 제작하기" },
          { id: "2", text: "티모 하이파이 열심히 제작하기" },
        ]}
        date="26.07.01"
        time="02 : 00"
        priority="urgent"
        tag="일상"
        hasMemo
        hasRepeat
      />

      {/* 3. 완료 + 핸들 O */}
      <TodayTodoCard
        title="티모 하이파이 작업하기"
        isDone
        isDraggable
        subTodos={[
          { id: "1", text: "티모 하이파이 열심히 제작하기", isDone: true },
          { id: "2", text: "티모 하이파이 열심히 제작하기", isDone: true },
        ]}
        date="26.07.01"
        time="02 : 00"
        priority="urgent"
        tag="일상"
        hasMemo
        hasRepeat
      />

      {/* 4. 완료 + 핸들 없는 버전 */}
      <TodayTodoCard
        title="티모 하이파이 작업하기"
        isDone
        subTodos={[
          { id: "1", text: "티모 하이파이 열심히 제작하기", isDone: true },
          { id: "2", text: "티모 하이파이 열심히 제작하기", isDone: true },
        ]}
        date="26.07.01"
        time="02 : 00"
        priority="urgent"
        tag="일상"
        hasMemo
        hasRepeat
      />
    </div>
  );
}
