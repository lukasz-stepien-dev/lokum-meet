"use client";

import {Calendar, Hourglass} from "lucide-react";
import DashboardCarousel from "@/components/ui/dashboardCarousel";
import useEventLatest from "@/hooks/useEventLatest";



export default function Home() {
    const { eventCard, isError, isLoading } = useEventLatest()
    if (isLoading) return <div>Loading...</div>
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
