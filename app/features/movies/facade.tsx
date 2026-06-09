import api from "./api";
import SlideShow from "@/app/components/slideShow";
import Card from "./cardMovies";

export default async function () {
  const data = await api();

  return <SlideShow data={data} component={[Card]} />;
}
