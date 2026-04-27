"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Event } from "@/src/types/Event";

export default function useEventId(id: number) {
  const { data, error, isLoading } = useSWR<Event>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/events/${id}`,
    fetcher
  );

  return {
    event: data,
    isLoading,
    isError: error
  }
}