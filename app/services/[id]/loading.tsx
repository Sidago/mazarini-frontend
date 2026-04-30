export default function ServiceDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="relative w-screen h-screen bg-neutral-800 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-neutral-700 border-t-primary rounded-full animate-spin" />
        <div className="h-12 w-80 bg-neutral-700 rounded mt-6" />
        <div className="h-4 w-120 bg-neutral-700 rounded" />
      </div>
      {/* Detail section skeleton */}
      <div className="py-20 md:py-32 bg-neutral-950">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mx-auto w-fit">
            <div className="w-full lg:w-100 aspect-3/5 bg-neutral-800 shrink-0" />
            <div className="flex-1 lg:pl-16 space-y-5 max-w-lg w-full">
              <div className="h-12 bg-neutral-800 rounded w-3/4" />
              <div className="h-4 bg-neutral-800 rounded" />
              <div className="h-4 bg-neutral-800 rounded w-5/6" />
              <div className="h-4 bg-neutral-800 rounded w-4/6" />
              <div className="h-4 bg-neutral-800 rounded w-3/4" />
              <div className="h-4 bg-neutral-800 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
