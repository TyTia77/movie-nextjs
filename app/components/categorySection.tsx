type CategorySectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function CategorySection({
  title,
  children,
}: CategorySectionProps) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-block w-1 h-6 bg-amber-400 rounded-full" />
        <h2
          className="text-white text-xl font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
      </div>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}
