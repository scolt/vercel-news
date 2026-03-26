import {getArticle} from '@/features/articles/queries/get-article';
import {getSubscriptionStatus, SUBSCRIPTION_STATUS} from '@/features/subscriptions';
import {getArticleContentDto} from '@/features/articles/dto/article';

export async function getProtectedArticleContent(slug: string) {
  const [article, { data }] = await Promise.all([
    getArticle(slug),
    getSubscriptionStatus(),
  ]);
  
  if (!article) {
    return null;
  }

  return getArticleContentDto(article, data === SUBSCRIPTION_STATUS.ACTIVE);
}
