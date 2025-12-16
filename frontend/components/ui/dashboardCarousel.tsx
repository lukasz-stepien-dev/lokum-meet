import React from "react";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle} from "@/components/ui/item";
import Image from "next/image";
import {Button} from "@/components/ui/button";

interface Item {
    image: string;
    name: string;
    description: string;
    date: string;
}

interface DashboardCarouselProps {
    children: React.ReactNode;
    items: Item[];
}

export default function DashboardCarousel({children, items}: DashboardCarouselProps) {
    return (
        <Carousel
            opts={{
                align: "start"
            }}
            className={"w-full"}
        >
            <CarouselContent className={"px-7"}>
                    {items.map((item, index) => (
                        <CarouselItem className={"sm:basis-3/4 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"}>
                            <Item key={index} variant={"outline"}>
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
                                    <ItemTitle className={"text-primary pl-1 text-xl"}>{item.date}</ItemTitle>
                                    <ItemTitle className={"text-2xl truncate pl-1"}>{item.name}</ItemTitle>
                                    <ItemDescription className={"pl-1"}>{item.description}</ItemDescription>
                                    <ItemActions className={"mt-4"}>
                                        <Button variant={"outline"} className={"w-1/2"}>Zapisz się</Button>
                                        <Button variant={"link"} className={"w-1/2"}>Więcej</Button>
                                    </ItemActions>
                                </ItemContent>
                            </Item>
                        </CarouselItem>

                    ))}
            </CarouselContent>
        </Carousel>
    )
}