import { paths, authenticatedFetch } from "@/app/api/fetch";
import Details from "@/app/components/details";

export default async function ({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = (await authenticatedFetch<actorDetailTypes>(
    paths.base + "/person/" + id,
  )) as actorDetailTypes;

  const {
    name,
    known_for_department,
    also_known_as,
    profile_path,
    biography,
    place_of_birth,
    birthday,
    deathday,
  } = response;

  const mapped = {
    name,
    known_for_department,
    also_known_as,
    profile_path,
    biography,
    details: {
      birthplace: place_of_birth,
      born: birthday,
      death: deathday || "N/A",
    },
  };

  return (
    <>
      <Details response={mapped} />
      {/* <DetailsPage response={mapped} /> */}
    </>
  );
}

export type actorDetailTypes = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};
