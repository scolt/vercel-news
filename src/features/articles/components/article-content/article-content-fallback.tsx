export function ArticleContentFallback() {
  return <div className="flex flex-col gap-4 mt-8">
    <div className="flex flex-col gap-2">
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-5/6 rounded bg-gray-200" />
      <div className="h-4 w-4/6 rounded bg-gray-200" />
    </div>

    <div className="flex flex-col gap-2">
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-3/4 rounded bg-gray-200" />
    </div>
  </div>;
}