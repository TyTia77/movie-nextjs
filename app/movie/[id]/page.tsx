import { paths, authenticatedFetch } from "@/app/api/fetch";
import Details from "@/app/components/details";

export default async function ({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = (await authenticatedFetch<movieDetailTypes>(
    paths.base + "/movie/" + id,
  )) as movieDetailTypes;

  const {
    title,
    tagline,
    release_date,
    runtime,
    genres,
    poster_path,
    overview,
    budget,
    revenue,
    spoken_languages,
    origin_country,
    vote_average,
    vote_count,
  } = response;

  const mapped = {
    name: title,
    tagline,
    release_date,
    runtime,
    genres,
    poster_path,
    overview,
    vote_average,
    vote_count,
    details: {
      budget: formatNumber(budget),
      revenue: formatNumber(revenue),
      language: spoken_languages[0].name,
      country: origin_country[0],
    },
  };

  return (
    <>
      <Details response={mapped} />
    </>
  );
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  return n.toLocaleString();
}

export type movieDetailTypes = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};
