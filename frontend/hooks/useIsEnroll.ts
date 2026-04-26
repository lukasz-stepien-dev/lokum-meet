import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function useIsEnroll(eventId: number) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/events/${eventId}/is-enroll`,
    fetcher
  );

  return {
    isEnroll: data,
    isLoading,
    isError: error
  }
}