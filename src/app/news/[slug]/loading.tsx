export default function Loading() {
  return (
    <div aria-label="Loading" role="status" className="flex flex-col w-full max-w-4xl m-auto p-4 gap-12">
      <div className="flex flex-col gap-4 animate-pulse">

        <div className="h-4 w-48 rounded bg-gray-200" />

        <div className="flex flex-col gap-2">
          <div className="h-10 w-full rounded bg-gray-200" />
          <div className="h-10 w-3/4 rounded bg-gray-200" />
        </div>

        <div className="relative">
          <div className="pb-[53%] rounded bg-gray-200" />
        </div>

        <div className="flex flex-col gap-4 mt-8">
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
        </div>
      </div>
    </div>
  );
}
