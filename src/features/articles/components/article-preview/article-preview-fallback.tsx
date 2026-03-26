export function ArticlePreviewFallback() {
  return <div className="flex flex-col gap-3 w-full">
    <div>
      <div className="h-40 w-full rounded bg-gray-200"></div>
    </div>
    <div className="flex gap-2 justify-between">
      <div className="h-3 w-20 rounded bg-gray-200" />
      <div className="h-3 w-20 rounded bg-gray-200" />
    </div>
    <div className="flex flex-col gap-2 justify-between">
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
    </div>
    <div className="flex flex-col gap-2 justify-between">
      <div className="h-2 w-full rounded bg-gray-200" />
      <div className="h-2 w-full rounded bg-gray-200" />
    </div>
  </div>
}
