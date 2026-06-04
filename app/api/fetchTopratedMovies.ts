import { authenticatedFetch, paths, ResponseType } from "./fetch";

type TopratedMovieResponse = ResponseType<TopratedMovie[]>;

type TopratedMovie = {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  name: string;
  origin_counter: string[];
  original_name: string;
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
};

const path = paths.base + "/movie/top_rated";

export default async function (): Promise<TopratedMovieResponse> {
  const data = await authenticatedFetch<TopratedMovieResponse>(path);

  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Tv Shows");

  return data;
}
