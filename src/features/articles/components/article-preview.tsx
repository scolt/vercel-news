import {components} from '@/libs/api';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import Image from 'next/image';
import {Typography} from '@/components/ui/typography';
import Link from 'next/link';
import dayjs from 'dayjs';

export interface ArticlePreviewProps {
  article: components['schemas']['Article']
}

export function ArticlePreviewFallback() {
  return <div className="flex flex-col gap-3 w-full md:w-[calc(33%-0.66rem)] sm:w-[calc(50%-0.5rem)]">
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

export function ArticlePreview({article}: ArticlePreviewProps) {
  const publishedAt = dayjs(article.publishedAt).format('MMM DD, YYYY');

  return <Link href={`/articles/${article.slug}`} className="flex w-full md:w-[calc(33%-0.66rem)] sm:w-[calc(50%-0.5rem)]">
    <Card className="w-full">
      {article.image && <Image
        className="relative z-20 aspect-video w-full object-cover"
        src={article.image}
        alt={`${article.title}`}
        width={400}
        height={225}
      />}
      <CardHeader>
        <div className="flex justify-between">
          <Typography variant="body2">{article.category}</Typography>
          <Typography variant="body2">{publishedAt}</Typography>
        </div>
        <CardTitle className="line-clamp-2 text-balance">{article.title}</CardTitle>
        <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
      </CardHeader>
    </Card>
  </Link>;
}
