import api from "./api";
import SlideRotate from "@/app/features/hero/slideRotate";
import Hero from "@/app/features/hero/hero";

import { HeroProvider } from "./context";

export default async function () {
  const data = await api();

  console.log({ data });

  return (
    // <HeroProvider >
    <SlideRotate data={data} interval={5000} component={[Hero]} />
    // </HeroProvider>
  );
}
