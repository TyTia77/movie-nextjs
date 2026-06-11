import Title from "./components/title";
import Hero from "./features/hero/facade";
import Actors from "./features/actors/facade";
import TvShows from "./features/tvShows/facade";
import Movies from "./features/movies/facade";

export default function Home() {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_1fr_200px_1fr_100px] gap-2 overflow-hidden">
      <div className="">
        <Hero />
      </div>
      <div className="">
        <div className="flex flex-col w-full ">
          <Title title="Top Rated Movies" />
          <Movies />
        </div>
      </div>

      <div className="">
        <div className="flex flex-col w-full pb-5">
          <Title title="Popular Actors" />
          <Actors />
        </div>

        <div className="">
          <div className="flex flex-col w-full ">
            <Title title="Tv Shows On Today" />
            <TvShows />
          </div>
        </div>
      </div>
    </div>
  );
}
