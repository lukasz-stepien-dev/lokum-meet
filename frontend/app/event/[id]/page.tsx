"use client";
import { useParams, useRouter } from "next/navigation";
import useEventId from "@/hooks/useEventId";
import { Button } from "@/components/ui/button";
import { ArrowUpLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  const { id } = useParams<{ id: string }>()
  const { event, isLoading, isError } = useEventId(Number(id));
  const router = useRouter();
  return (
    // #TODO: implement event page
    <section className={"flex justify-center w-full pt-10"}>
      <section className={""}>
        <Button
          className={"-ml-3"}
          variant={"link"}
          onClick={() => {
            router.back();
          }}
        >
          <ArrowUpLeft />
          Powrót
        </Button>
        <h1 className={"text-4xl font-extrabold tracking-tight text-balance"}>{event?.title}</h1>
        <section className={"flex flex-row items-center my-5"}>
          {
            // #TODO: implement author name and avatar
          }
          <Avatar>
            <AvatarImage
              src={""}
              alt={"Author avatar"}
              />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <p className={"leading-7 ml-3"}>Author name</p>
        </section>
      </section>
    </section>
  );
}