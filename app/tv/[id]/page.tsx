import { paths, authenticatedFetch } from "@/app/api/fetch";
import Details from "@/app/components/details";

export default async function ({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = (await authenticatedFetch<tvDetailTypes>(
    paths.base + "/tv/" + id,
  )) as tvDetailTypes;

  const {
    name,
    tagline,
    genres,
    poster_path,
    overview,
    status,
    number_of_seasons,
    number_of_episodes,
    vote_average,
    vote_count,
  } = response;

  const mapped = {
    name,
    tagline,
    genres,
    poster_path,
    overview,
    vote_average,
    vote_count,
    details: {
      seasons: number_of_seasons,
      episodes: number_of_episodes,
      status,
    },
  };

  return (
    <>
      <Details response={mapped} />
    </>
  );
}

export type tvDetailTypes = {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;

  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;

  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
};
