import { HomeHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/HomeHeaderContainer";
import { HomeTodoContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/HomeTodoContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";
import { SectionErrorFallback } from "@/components/boundary/SectionErrorFallback";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      <AsyncBoundary
        errorFallback={(_, reset) => <SectionErrorFallback reset={reset} />}
      >
        <HomeHeaderContainer />
      </AsyncBoundary>
      <section className="min-h-0 flex-1 px-5 pt-2.5">
        <AsyncBoundary
          errorFallback={(_, reset) => <SectionErrorFallback reset={reset} />}
        >
          <HomeTodoContainer />
        </AsyncBoundary>
      </section>
    </div>
  );
}
