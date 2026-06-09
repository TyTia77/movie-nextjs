import { authenticatedFetch, paths, ResponseType } from "@/app/api/fetch";

export type PopularActorsResponse = ResponseType<PopularActorsType[]>;

export type PopularActorsType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
  known_for: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
};

const path = paths.base + "/person/popular";

export default async function (): Promise<PopularActorsResponse> {
  const data = await authenticatedFetch<PopularActorsResponse>(path);

  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Popular Actors");

  return data;
}
