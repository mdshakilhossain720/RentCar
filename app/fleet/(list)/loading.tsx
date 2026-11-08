export default function Loading() {
  return (
    <div className="container-x pt-36 pb-24" aria-busy="true" aria-label="Loading vehicles">
      <div className="h-12 w-64 animate-pulse rounded-lg bg-white/5" />
      <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-white/5" />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 desk:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-white/8 bg-card">
            <div className="aspect-[16/10] animate-pulse bg-white/5" />
            <div className="flex flex-col gap-3 p-6">
              <div className="h-6 w-2/3 animate-pulse rounded bg-white/5" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-white/5" />
              <div className="h-16 animate-pulse rounded-xl bg-white/5" />
              <div className="h-10 animate-pulse rounded-lg bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
