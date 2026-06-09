export type ResponseType<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T;
};

export async function authenticatedFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T | undefined> {
  const headers = {
    ...options?.headers,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWViNTZmODgzZjQ1M2UxZjUyMzMzOGRiNDQwZWI5ZSIsIm5iZiI6MTUwNTg5MzI4Ny41Nzc5OTk4LCJzdWIiOiI1OWMyMWJhNzkyNTE0MTc2OGEwMDk3ZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NZtHiZyMMTgCaK4WqALEugaP_aKDViRpwQjJmSakAao`,
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error("One of the fetches failed:", error);
  }
}

export const paths = {
  base: "https://api.themoviedb.org/3",
  images: {
    base: "https://image.tmdb.org/t/p/original",
  },
};
