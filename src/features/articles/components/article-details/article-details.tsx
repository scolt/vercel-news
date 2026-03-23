import Image from 'next/image';
import {Typography} from '@/components/ui/typography';
import {DisplayDate} from '@/components/display-date/display-date';
import {BlocksView} from '@/components/blocks-view/blocks-view';
import {SubscriptionPromo} from '@/features/subscriptions';
import {ArticleDTO} from '@/features/articles/dto/article';

export interface ArticleDetailsProps {
  article: ArticleDTO;
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
      height={550}
      width={1024}
    /> }
    <div className="mt-8">
      <BlocksView blocks={article.content} />
    </div>
    {!article.isFullContent ? <SubscriptionPromo /> : null}
  </div>;
}
