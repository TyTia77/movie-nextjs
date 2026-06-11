import { authenticatedFetch, paths, ResponseType } from "@/app/api/fetch";

export type TvShowResponse = ResponseType<TvShowType[]>;

export type TvShowType = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_counter: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

const path = paths.base + "/tv/airing_today";

export default async function (): Promise<TvShowResponse> {
  const data = await authenticatedFetch<TvShowResponse>(path);

  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Tv Shows");

  return data;
}
