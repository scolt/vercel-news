export function BreakingNewsWidgetFallback () {
  return <div className="flex bg-gray-900 justify-center h-11" aria-label="Loading" role="status">
    <div className="flex max-w-3xl w-full px-4 items-center justify-between gap-2 animate-pulse">
      <div className="flex gap-2 items-center">
        <div className="h-6 w-20 rounded bg-gray-200" />
        <div className="h-4 w-48 rounded bg-gray-200" />
      </div>
      <div>
        <div className="mb-2 h-6 w-15 rounded bg-gray-200" />
      </div>
    </div>
  </div>
}
