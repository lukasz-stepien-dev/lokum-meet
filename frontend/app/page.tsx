import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle} from "@/components/ui/item";
import {Calendar} from "lucide-react";
import {Button} from "@/components/ui/button";

const example = [
    {
        name: "Film club",
        description: "Everyday tasks and UI generation.",
        image:
            "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
    },
    {
        name: "Sport club",
        description: "Advanced thinking or reasoning.",
        image:
            "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
    },
    {
        name: "Book club",
        description: "Open Source model for everyone.",
        image:
            "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
    },
]



export default function Home() {
  return (
  <main className="flex min-h-screen w-full flex-col">
      <h1 className={"text-4xl mt-10 ml-7 mb-3"}>For You</h1>
    <Carousel
        opts={{
            align: "start"
        }}
        className={"w-full"}
    >
        <CarouselContent className={"px-7"}>
            <CarouselItem className={"basis-1/6"}>
                <Item variant={"outline"}>
                    <ItemHeader>
                        <Image
                            src={example[0].image}
                            alt={example[0].description}
                            width={300} height={150}
                            className={"aspect-video object-cover w-full rounded-md"}
                        />
                    </ItemHeader>
                    <ItemContent className={"w-full"}>
                        <ItemTitle className={"text-primary pl-1 text-xl"}>Tue, Jan 5, 5:00 PM</ItemTitle>
                        <ItemTitle className={"text-2xl truncate pl-1"}>{example[0].name}</ItemTitle>
                        <ItemDescription className={"pl-1"}>{example[0].description}</ItemDescription>
                        <ItemActions className={"mt-4"}>
                            <Button variant={"outline"} className={"w-1/2"}>Zapisz się</Button>
                            <Button variant={"link"} className={"w-1/2"}>Więcej</Button>
                        </ItemActions>
                    </ItemContent>
                </Item>
            </CarouselItem>
        </CarouselContent>
    </Carousel>
  </main>
  );
}
