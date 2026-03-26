import Image from 'next/image';
import Link from 'next/link';

import {components} from '@/libs/api';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Typography} from '@/components/ui/typography';
import {DisplayDate} from '@/components/display-date/display-date';
import { BLUR_PIXEL } from '@/constants';

export interface ArticlePreviewProps {
  article: components['schemas']['Article']
}

export function ArticlePreview({article}: ArticlePreviewProps) {
  return <Link href={`/news/${article.slug}`} className="flex w-full]" prefetch={false}>
    <Card className="w-full">
      {article.image && <Image
        preload
        className="relative aspect-video w-full object-cover"
        placeholder="blur"
        blurDataURL={BLUR_PIXEL}
        src={article.image}
        alt={`${article.title}`}
        width={400}
        height={225}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
      />}
      <CardHeader>
        <div className="flex justify-between">
          <Typography variant="body2">{article.category}</Typography>
          <Typography variant="body2">
            <DisplayDate date={article.publishedAt} />
          </Typography>
        </div>
        <CardTitle className="line-clamp-2 text-balance">{article.title}</CardTitle>
        <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
      </CardHeader>
    </Card>
  </Link>;
}
