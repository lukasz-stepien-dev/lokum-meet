"use client";
import { useParams, useRouter } from "next/navigation";
import useEventId from "@/hooks/useEventId";
import { Button } from "@/components/ui/button";
import { ArrowUpLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFormatter } from "next-intl";

export default function Page() {
  const { id } = useParams<{ id: string }>()
  const { event, isLoading, isError } = useEventId(Number(id));
  const router = useRouter();
  const format = useFormatter();
  if (isError || event === undefined) return <div>Błąd załadowania danych</div>;
  return (
    // #TODO: implement photo
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

        <h1 className={"text-4xl font-extrabold tracking-tight text-balance"}>
          {event.title}
        </h1>
        <h2>
          {
            format.dateTime(new Date(event.startTime), {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          }
        </h2>
        <section className={"flex flex-row items-center my-5"}>
          <Avatar>
            <AvatarImage
              src={event.createdBy.avatarUrl}
              alt={"Author avatar"}
            />
            <AvatarFallback>
              {event.createdBy.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className={"leading-7 ml-3"}>{event.createdBy.username}</p>
        </section>

        <p>{event.description}</p>
      </section>
    </section>
  );
}