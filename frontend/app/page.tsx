"use client";

import {Calendar, Hourglass} from "lucide-react";
import DashboardCarousel from "@/components/dashboardCarousel";
import useEventLatest from "@/hooks/useEventLatest";
import { Spinner } from "@/components/ui/spinner";
import useIsEnroll from "@/hooks/useIsEnroll";



export default function Home() {
    const { isEnroll } = useIsEnroll(1);
    console.log(isEnroll);
    const { eventCard, isError, isLoading } = useEventLatest();
    if (isLoading) return <Spinner />
    if (isError) return <div>Error loading data</div>
  return (
  <main className="flex min-h-screen w-full flex-col">
      <h1 className={"text-3xl font-light mt-10 ml-7 mb-3 flex flex-row items-center text-destructive"}>
          <Hourglass strokeWidth={2} className={"mx-2"}/>
          Najbliższe
      </h1>
      <DashboardCarousel items={eventCard} children={undefined}></DashboardCarousel>
  </main>
  );
}
