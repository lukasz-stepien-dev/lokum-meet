"use client"

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function useEventLatest() {
    const { data, error, isLoading } = useSWR("http://localhost:8080/events/latest", fetcher);

    return {
        eventCard: data,
        isLoading,
        isError: error
    }
}