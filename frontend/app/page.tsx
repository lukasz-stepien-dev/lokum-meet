import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle} from "@/components/ui/item";
import {Calendar, Hourglass} from "lucide-react";
import {Button} from "@/components/ui/button";
import DashboardCarousel from "@/components/ui/dashboardCarousel";

const example = [
    {
        name: "Klub filmowy",
        description: "Zapraszam wszystkich miłośników kina na wspólne seanse i dyskusje o filmach.",
        image:
            "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
        date: "Wt, 20 Cze, 18:00"
    },
    {
        name: "Sport club",
        description: "Advanced thinking or reasoning.",
        image:
            "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
        date: "Wt, 20 Cze, 18:00"
    },
    {
        name: "Book club",
        description: "Open Source model for everyone.",
        image:
            "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
        date: "Wt, 20 Cze, 18:00"
    },
]



export default function Home() {
  return (
  <main className="flex min-h-screen w-full flex-col">
      <h1 className={"text-3xl font-light mt-10 ml-7 mb-3 flex flex-row items-center text-destructive"}>
          <Hourglass strokeWidth={2} className={"mx-2"}/>
          Najbliższe
      </h1>
    <DashboardCarousel items={example} children={undefined}></DashboardCarousel>
  </main>
  );
}
