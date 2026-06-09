import { authenticatedFetch, paths, ResponseType } from "@/app/api/fetch";

export type MoviesResponse = ResponseType<MovieType[]>;

export type MovieType = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
};

export async function fetchPopularMovies(): Promise<MoviesResponse> {
  const data = await authenticatedFetch<MoviesResponse>(
    paths.base + "/movie/popular",
  );
  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Popular Movies");

  return data;
}

export async function fetchTopRatedMovies(): Promise<MoviesResponse> {
  const data = await authenticatedFetch<MoviesResponse>(
    paths.base + "/movie/top_rated",
  );
  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Top Rated Movies");
  return data;
}

export async function fetchUpcomingMovies(): Promise<MoviesResponse> {
  const data = await authenticatedFetch<MoviesResponse>(
    paths.base + "/movie/upcoming",
  );
  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Upcoming Movies");
  return data;
}
