"use client";
import { useParams } from "next/navigation";
import useEventId from "@/hooks/useEventId";

export default function Page() {
  const { id } = useParams<{ id: string }>()
  const { event, isLoading, isError } = useEventId(Number(id));
  return (
    // #TODO: implement event page
    <div>Event page id: {id}</div>
  )
}