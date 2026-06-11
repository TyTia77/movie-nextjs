import { authenticatedFetch, paths, ResponseType } from "@/app/api/fetch";

export type ActorsResponse = ResponseType<ActorType[]>;

export type ActorType = {
  id: number;
  name: string;
  profile_path: string;
  popularity: number;
  known_for_department: string;
  gender: number;
  adult: boolean;
  known_for: {
    id: number;
    title?: string;
    name?: string;
    media_type: string;
    poster_path: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
  }[];
};

export async function fetchTrendingActors(): Promise<ActorsResponse> {
  const data = await authenticatedFetch<ActorsResponse>(
    paths.base + "/trending/person/day?language=en-US",
  );
  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Popular Actors");
  return data;
}

export async function fetchPopularActors(): Promise<ActorsResponse> {
  const data = await authenticatedFetch<ActorsResponse>(
    paths.base + "/person/popular",
  );
  if (!data || Array.isArray(data))
    throw new Error("Unexpected Error Fetching Popular Actors");
  return data;
}
