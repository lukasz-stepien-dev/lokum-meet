export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => {
      console.log("Fetcher response:", res);
      return res.json()
  });