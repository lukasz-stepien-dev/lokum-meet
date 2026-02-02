"use client"

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function useEventLatest() {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/public/events/latest`, fetcher);

    return {
        eventCard: data,
        isLoading,
        isError: error
    }
}