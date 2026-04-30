export default function ServicesLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="w-screen h-screen bg-neutral-800 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-neutral-700 border-t-primary rounded-full animate-spin" />
        <div className="h-12 w-80 bg-neutral-700 rounded mt-6" />
        <div className="h-4 w-96 bg-neutral-700 rounded" />
      </div>
      {/* Grid skeleton */}
      <div className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
                <div className="h-5 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4" />
                <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
