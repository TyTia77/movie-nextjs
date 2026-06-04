import { authenticatedFetch, paths, ResponseType } from "./fetch";

type UpcomingMoviesResponse = ResponseType<UpcomingMovies[]> & {
  dates: {
    maximum: string;
    minimum: string;
  };
};

type UpcomingMovies = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
};

const path = paths.base + "/movie/upcoming";

export default async function (): Promise<UpcomingMoviesResponse> {
  const data = await authenticatedFetch<UpcomingMoviesResponse>(path);

  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Tv Shows");

  return data;
}
