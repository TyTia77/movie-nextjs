export default function Title({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-white pl-4">{title}</h2>
      {subtitle && (
        <p className="text-sm text-white/50 mt-1 pl-4">{subtitle}</p>
      )}
    </div>
  );
}
