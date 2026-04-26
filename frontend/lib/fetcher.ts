export const fetcher = (url: string | URL | Request) =>
  fetch(url, {
    credentials: "include",
  }).then((res) => res.json());