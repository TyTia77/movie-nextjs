import { fetchPopularActors, fetchTrendingActors } from "./api";
import ActorCard from "./actorCard";
import CategorySection from "@/app/components/categorySection";

export default async function ActorsPage() {
  // const popular = await fetchPopularActors();

  const [trending, popular] = await Promise.all([
    fetchTrendingActors(),
    fetchPopularActors(),
  ]);

  console.log({ trending, popular });

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 max-w-2xl mx-auto">
      <h1
        className="text-white text-4xl font-bold mb-10"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Actors
      </h1>

      {/* <CategorySection title="Trending">
        {trending.results.map((item) => (
          <ActorCard key={item.id} item={item} />
        ))}
      </CategorySection> */}

      <CategorySection title="Popular">
        {popular.results.map((item) => (
          <ActorCard key={item.id} item={item} />
        ))}
      </CategorySection>
    </div>
  );
}
