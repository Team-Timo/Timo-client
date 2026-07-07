import { FocusHeaderContainer } from "@/app/[locale]/(main)/focus/_containers/FocusHeaderContainer";
import { FocusTimerContainer } from "@/app/[locale]/(main)/focus/_containers/FocusTimerContainer";

export default function FocusPage() {
  return (
    <div className="flex h-full flex-col">
      <FocusHeaderContainer />
      <section className="border-timo-gray-500 flex flex-1 items-center justify-end border-l bg-white">
        <FocusTimerContainer />
      </section>
    </div>
  );
}
