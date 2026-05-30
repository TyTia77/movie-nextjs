import Hero from "./components/hero";
import { paths } from "./api/fetch";
import WithApi from "./components/withApi";
import CardStacks from "./components/cardStacks";
import Round from "./components/roundCard";
import Stacker from "./components/stacker";

import UseHero from "./components/useHero";
import UseCard from "./components/useCard";
import Card from "./components/card";

import Title from "./components/title";

export default function Home() {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr_1fr_200px_1fr_100px] gap-2 overflow-hidden">
      {/* <div className="height-[100%]">
        <Menu />
      </div> */}
      <div className="">
        <WithApi
          interval={5000}
          api={`${paths.base + paths.keys.movie + paths.keys.upcoming}`}
          component={[UseHero]}
        />
      </div>
      <div className="">
        <div className="flex flex-col w-full ">
          <Title title="Top Rated Movies" />

          <WithApi
            // interval={5000}
            // visible={4}
            api={`${paths.base + paths.keys.movie + paths.keys.top_rated}`}
            component={[UseCard, Card]}
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
            api={`${paths.base + paths.keys.person + paths.keys.popular}`}
            component={[UseCard, Round]}
          />
        </div>

        <div className="">
          <div className="flex flex-col w-full ">
            <Title title="Tv Shows On Today" />

            <WithApi
              // interval={5000}
              // visible={4}
              api={`${paths.base + paths.keys.tv + paths.keys.airing_today}`}
              component={[UseCard, Card]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
