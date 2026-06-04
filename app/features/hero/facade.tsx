import api from "./api";
import SlideRotate from "@/app/components/slideRotate";
import Hero from "@/app/components/hero";

import { HeroProvider } from "./context";

export default async function () {
  const data = await api();

  return (
    // <HeroProvider >
    <SlideRotate data={data} interval={5000} component={[Hero]} />
    // </HeroProvider>
  );
}
