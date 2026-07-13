import { HomeHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/HomeHeaderContainer";
import { HomeLanguageSyncContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/HomeLanguageSyncContainer";
import { HomeTodoContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/HomeTodoContainer";
import { AsyncBoundary } from "@/components/boundary/AsyncBoundary";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      <AsyncBoundary>
        <HomeLanguageSyncContainer />
      </AsyncBoundary>
      <AsyncBoundary>
        <HomeHeaderContainer />
      </AsyncBoundary>
      <section className="min-h-0 flex-1 px-5 pt-2.5">
        <AsyncBoundary>
          <HomeTodoContainer />
        </AsyncBoundary>
      </section>
    </div>
  );
}
