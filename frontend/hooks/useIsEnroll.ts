import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface IsEnrollResponse {
  isEnroll: boolean;
}

export default function useIsEnroll(eventId: number) {
  const { data, error, isLoading } = useSWR<IsEnrollResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/events/${eventId}/is-enroll`,
    fetcher
  );

  return {
    isEnroll: data?.isEnroll ?? false,
    isLoading,
    isError: error
  }
}