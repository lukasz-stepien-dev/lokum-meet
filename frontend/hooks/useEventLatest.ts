"use client"

import { publicFetcher } from "@/lib/publicFetcher";
import useSWR from "swr";

export default function useEventLatest() {
    const { data, error, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/api/public/events/latest`,
      publicFetcher
    );

    return {
        eventCard: data,
        isLoading,
        isError: error
    }
}