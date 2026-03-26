import Image from 'next/image';
import {Typography} from '@/components/ui/typography';
import {DisplayDate} from '@/components/display-date/display-date';
import { ArticleInfoDTO }  from '@/features/articles/dto/article';
import { BLUR_PIXEL } from '@/constants';

export interface ArticleDetailsProps {
  article: ArticleInfoDTO;
}

export function ArticleDetails({
  article
}: ArticleDetailsProps) {
  return <div className="flex flex-col gap-4">
    <Typography variant="caption">{article.category} | {article.author?.name} | <DisplayDate date={article.publishedAt} /></Typography>
    <Typography variant="heading1" as="h1">{article.title}</Typography>
    {article.image && <Image
      alt={article.title || 'Article image'}
      src={article.image}
      placeholder="blur"
      blurDataURL={BLUR_PIXEL}
      height={550}
      width={1024}
    /> }
  </div>;
}
