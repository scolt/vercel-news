import { BlocksView } from '@/components/blocks-view/blocks-view';
import { SubscriptionPromo } from '@/features/subscriptions/components/subscription-promo/subscription-promo';
import { getProtectedArticleContent } from '../../queries/get-protected-article-content';

export interface ArticleContentProps {
    slug: string;
}

export async function ArticleContent({ slug }: ArticleContentProps) {
  const data = await getProtectedArticleContent(slug);

  if (!data) {
    return null;
  }
    
  return <div className="flex flex-col mt-8">
    <BlocksView blocks={data.content} />
    {data.contentType === 'promo' ? <SubscriptionPromo /> : null}
  </div>;
}
