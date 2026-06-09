import { fetchPopularTv, fetchTopRatedTv, fetchAiringTodayTv } from "./api";
import MediaCard from "@/app/components/mediaCard";
import CategorySection from "@/app/components/categorySection";

export default async function TvPage() {
  const [popular, topRated, airingToday] = await Promise.all([
    fetchPopularTv(),
    fetchTopRatedTv(),
    fetchAiringTodayTv(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 max-w-2xl mx-auto">
      <h1
        className="text-white text-4xl font-bold mb-10"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        TV Shows
      </h1>

      <CategorySection title="Popular">
        {popular.results.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.name}
            posterPath={item.poster_path}
            releaseDate={item.first_air_date}
            rating={item.vote_average}
            overview={item.overview}
            href={`/tv/${item.id}`}
          />
        ))}
      </CategorySection>

      <CategorySection title="Top Rated">
        {topRated.results.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.name}
            posterPath={item.poster_path}
            releaseDate={item.first_air_date}
            rating={item.vote_average}
            overview={item.overview}
            href={`/tv/${item.id}`}
          />
        ))}
      </CategorySection>

      <CategorySection title="Airing Today">
        {airingToday.results.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.name}
            posterPath={item.poster_path}
            releaseDate={item.first_air_date}
            rating={item.vote_average}
            overview={item.overview}
            href={`/tv/${item.id}`}
          />
        ))}
      </CategorySection>
    </div>
  );
}
