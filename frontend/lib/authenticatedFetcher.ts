import { cookies } from "next/headers";

async function authenticatedFetcher(url: String) {
  const cookieStore = await cookies();
  const res = await fetch(url, {
    // #TODO JESSIONID from cookie to authenticate
  })
}