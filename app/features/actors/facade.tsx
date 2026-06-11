import api from "./api";
import SlideShow from "@/app/components/slideShow";
import CardRound from "./cardRound";

export default async function () {
  const data = await api();

  return (
    <SlideShow
      data={data}
      breakpoints={{
        0: 1,
        480: 3,
        768: 5,
        1024: 6,
      }}
      component={[CardRound]}
    />
  );
}
