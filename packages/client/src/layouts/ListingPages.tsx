export default function ListingLayout({
  children,
  error,
  title,
}: {
  children: React.ReactNode;
  error?: string | null;
  title: string;
}) {
  return (
    <div className="px-8 py-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
      {error && <p className="text-red-500 font-semibold text-xl">{error}</p>}
      <div className="flex flex-wrap gap-6 mx-5">{children}</div>
    </div>
  );
}
