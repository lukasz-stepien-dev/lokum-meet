"use client";

import useSWR from "swr";
import { publicFetcher } from "@/lib/publicFetcher";
import { Event } from "@/src/types/Event";

export default function useEventId(id: number) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/events/${id}`,
    publicFetcher
  );

  return {
    event: data ? Event.fromJSON(data) : undefined,
    isLoading,
    isError: error
  }
}