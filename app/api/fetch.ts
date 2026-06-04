export type ResponseType<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T;
};

export async function authenticatedFetch<T>(
  urls: string | string[],
  options: RequestInit = {},
): Promise<T | T[] | undefined> {
  const headers = {
    ...options?.headers,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWViNTZmODgzZjQ1M2UxZjUyMzMzOGRiNDQwZWI5ZSIsIm5iZiI6MTUwNTg5MzI4Ny41Nzc5OTk4LCJzdWIiOiI1OWMyMWJhNzkyNTE0MTc2OGEwMDk3ZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NZtHiZyMMTgCaK4WqALEugaP_aKDViRpwQjJmSakAao`,
    "Content-Type": "application/json",
  };

  try {
    const gg = typeof urls === "string" ? [urls] : [...urls];

    // 1. Fire all fetch requests in parallel and wait for them all to complete
    const responses = await Promise.all(
      gg.map((url) => fetch(url, { ...options, headers })),
    );

    // 2. Safely verify that every response returned an HTTP 200-299 status code
    for (const response of responses) {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 3. Fire all JSON parsing streams concurrently and wait until all finish
    const data = await Promise.all(responses.map((res) => res.json()));

    // console.log("All done! Here is the data:", data);
    return (data.length <= 1 ? data[0] : data) as T | T[];
  } catch (error) {
    console.error("One of the fetches failed:", error);
  }

  // const res = await fetch(url, { ...options, headers });
  // return res.json();
}

export const paths = {
  keys: {
    person: "/person",
    popular: "/popular",

    movie: "/movie",
    upcoming: "/upcoming",
    top_rated: "/top_rated",

    tv: "/tv",
    airing_today: "/airing_today",
  },
  base: "https://api.themoviedb.org/3",
  images: {
    base: "https://image.tmdb.org/t/p/original",
  },
};
