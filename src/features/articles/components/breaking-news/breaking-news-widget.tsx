import {getBreakingNews} from '@/features/articles/queries/get-breaking-news';
import Link from 'next/link';
import {Badge} from '@/components/ui/badge';
import {ArrowRight} from 'lucide-react';
import {Typography} from '@/components/ui/typography';

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
        <ArrowRight aria-hidden="true" />
      </div>
    </div>
  </Link>
}
