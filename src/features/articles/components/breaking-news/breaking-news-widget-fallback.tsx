export function BreakingNewsWidgetFallback () {
  return <div className="flex justify-center h-10" aria-label="Loading" role="status">
    <div className="flex max-w-4xl w-full px-4 items-center justify-between gap-2 animate-pulse">
      <div className="flex gap-2 items-center">
        <div className="h-5 w-20 rounded bg-gray-200" />
        <div className="h-4 w-48 rounded bg-gray-200" />
      </div>
      <div>
        <div className="h-6 w-7 rounded bg-gray-200" />
      </div>
    </div>
  </div>;
}
