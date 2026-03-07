import {getBreakingNews} from '@/features/articles/queries/get-breaking-news';
import Link from 'next/link';
import {Badge} from '@/components/ui/badge';
import {ArrowRight, TriangleAlert} from 'lucide-react';
import {Typography} from '@/components/ui/typography';

export function BreakingNewsWidgetFallback () {
  return <div className="flex bg-gray-900 justify-center h-11" aria-label="Loading" role="status">
    <div className="flex max-w-4xl w-full px-4 items-center justify-between gap-2 animate-pulse">
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

export async function BreakingNewsWidget() {
  const breakingNews = await getBreakingNews();

  if (breakingNews.error || !breakingNews?.data?.id) {
    return null;
  }

  return <Link aria-label="Go to the last breaking news" href={`/news/${breakingNews.data.id}`} className="cursor-pointer flex bg-gray-900 justify-center py-2">
    <div className="flex max-w-4xl w-full px-4 items-center justify-between gap-2">
      <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
        <Badge variant="secondary">BREAKING</Badge>
        <Typography as="h2" variant="strong2" className="text-white overflow-hidden text-ellipsis text-nowrap ">{breakingNews.data.headline}</Typography>
      </div>
      <div className="flex gap-2 items-center text-white">
        <TriangleAlert aria-hidden="true" />
        <ArrowRight aria-hidden="true" />
      </div>
    </div>
  </Link>
}
