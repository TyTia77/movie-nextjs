import { authenticatedFetch, paths, ResponseType } from "@/app/api/fetch";

export type TvResponse = ResponseType<TvType[]>;

export type TvType = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  // overview: string;
  popularity: number;
  origin_country: string[];
};

export async function fetchPopularTv(): Promise<TvResponse> {
  const data = await authenticatedFetch<TvResponse>(paths.base + "/tv/popular");
  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Popular TV");
  return data;
}

export async function fetchTopRatedTv(): Promise<TvResponse> {
  const data = await authenticatedFetch<TvResponse>(
    paths.base + "/tv/top_rated",
  );
  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Top Rated TV");
  return data;
}

export async function fetchAiringTodayTv(): Promise<TvResponse> {
  const data = await authenticatedFetch<TvResponse>(
    paths.base + "/tv/airing_today",
  );
  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Airing Today TV");
  return data;
}
