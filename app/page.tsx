// import { paths } from "./api/fetch";
import WithApi from "./components/withApi";

import SlideRotate from "./components/slideRotate";
import SlideShow from "./components/slideShow";

import CardRound from "./components/cardRound";
// import Card from "./components/cards/card";

import CardMovies from "./components/cards/cardMovies";
import CardTVs from "./components/cards/cardTvs";

import Title from "./components/title";

import fetchTvShows from "./api/fetchTvShows";
import fetchPopularActors from "./api/fetchPopularActors";
import fetchTopratedMovies from "./api/fetchTopratedMovies";

import fetchUpcomingMovies from "./api/fetchUpcomingMovies";
import Hero from "./features/hero/facade";

export default function Home() {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_1fr_200px_1fr_100px] gap-2 overflow-hidden">
      <div className="">
        {/* <WithApi
          interval={5000}
          api={fetchUpcomingMovies}
          component={[SlideRotate, Hero]}
        /> */}
        <Hero />
      </div>
      <div className="">
        <div className="flex flex-col w-full ">
          <Title title="Top Rated Movies" />

          <WithApi
            // interval={5000}
            // visible={4}
            api={fetchTopratedMovies}
            component={[SlideShow, CardMovies]}
          />
        </div>
      </div>

      <div className="">
        <div className="flex flex-col w-full pb-5">
          <Title title="Popular Actors" />
          <WithApi
            breakpoints={{
              0: 1,
              480: 3,
              768: 5,
              1024: 6,
            }}
            api={fetchPopularActors}
            component={[SlideShow, CardRound]}
          />
        </div>

        <div className="">
          <div className="flex flex-col w-full ">
            <Title title="Tv Shows On Today" />

            <WithApi
              // interval={5000}
              // visible={4}
              api={fetchTvShows}
              component={[SlideShow, CardTVs]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
