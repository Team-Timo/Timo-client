import { HomeHeaderContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/HomeHeaderContainer";
import { HomeTodoContainer } from "@/app/[locale]/(main)/(with-time-sidebar)/home/_containers/HomeTodoContainer";

export default function HomePage() {
  return (
    <>
      <HomeHeaderContainer />
      <section>
        <HomeTodoContainer />
      </section>
    </>
  );
}
