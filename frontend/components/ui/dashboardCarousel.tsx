import React from "react";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle} from "@/components/ui/item";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { useFormatter } from "next-intl";

interface Item {
  id: number;
    image: string;
    title: string;
    description: string;
    startTime: Date;
}

interface DashboardCarouselProps {
    children: React.ReactNode;
    items: Item[];
}

export default function DashboardCarousel({children, items}: DashboardCarouselProps) {
    const format = useFormatter();
    return (
        <Carousel
            opts={{
                align: "start"
            }}
            className={"w-full"}
        >
            <CarouselContent className={"px-7"}>
                    {items.map((item) => (
                        <CarouselItem className={"sm:basis-3/4 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"}>
                            <Item key={item.id} variant={"outline"}>
                                <ItemHeader>
                                    <Image
                                        src={item.image}
                                        alt={item.description}
                                        width={300}
                                        height={150}
                                        className={"aspect-video object-cover w-full rounded-md"}
                                    />
                                </ItemHeader>
                                <ItemContent className={"w-full"}>
                                    <ItemTitle className={"text-primary pl-1 text-xl"}>
                                      {
                                        format.dateTime(item.startTime, {
                                          day: "2-digit",
                                          month: "long",
                                          year: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: false,
                                          timeZone: "Europe/Warsaw"
                                        })
                                      }
                                    </ItemTitle>
                                    <ItemTitle className={"text-2xl truncate pl-1"}>{item.title}</ItemTitle>
                                    <ItemDescription className={"pl-1"}>{item.description}</ItemDescription>
                                    <ItemActions className={"mt-4"}>
                                        <Button variant={"outline"} className={"w-1/2"}>Zapisz się</Button>
                                        <Link className={"flex justify-center"} href={`/event/${item.id}`}>
                                          <Button variant={"link"} className={"w-1/2"}>Więcej</Button>
                                        </Link>
                                    </ItemActions>
                                </ItemContent>
                            </Item>
                        </CarouselItem>

                    ))}
            </CarouselContent>
        </Carousel>
    )
}