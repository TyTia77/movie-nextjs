import Hero from "./components/hero";
import { paths } from "./api/fetch";
import WithApi from "./components/withApi";
import CardStacks from "./components/cardStacks";

export default function Home() {
  return (
    <div className="grid grid-cols-1 grid-rows-[40px_1fr_1fr_1fr_1fr_1fr] gap-2">
      <div className=" ">menu</div>
      <div className=" ">
        <WithApi
          interval={5000}
          api={`${paths.base + paths.keys.movie + paths.keys.upcoming}`}
          component={Hero}
        />
      </div>
      <div className="">
        <WithApi
          // interval={5000}
          visible={3}
          api={`${paths.base + paths.keys.movie + paths.keys.top_rated}`}
          component={CardStacks}
        />
      </div>
      <div className=""></div>
      <div className="">topmove</div>
      <div className="h-[200px] ">actor</div>
    </div>
  );
}
