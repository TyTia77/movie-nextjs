export async function authenticatedFetch(url, options = {}) {
  const headers = {
    ...options.headers,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWViNTZmODgzZjQ1M2UxZjUyMzMzOGRiNDQwZWI5ZSIsIm5iZiI6MTUwNTg5MzI4Ny41Nzc5OTk4LCJzdWIiOiI1OWMyMWJhNzkyNTE0MTc2OGEwMDk3ZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NZtHiZyMMTgCaK4WqALEugaP_aKDViRpwQjJmSakAao`,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, { ...options, headers });
  return res.json();
}

export const paths = {
  keys: {
    movie: "/movie",
    upcoming: "/upcoming",
    top_rated: "/top_rated",
  },
  base: "https://api.themoviedb.org/3",
  images: {
    base: "https://image.tmdb.org/t/p/original",
  },
};
