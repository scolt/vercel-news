import {getArticle} from '@/features/articles/queries/get-article';
import {getSubscriptionStatus, SUBSCRIPTION_STATUS} from '@/features/subscriptions';
import {getArticleDTO} from '@/features/articles/dto/article';

export async function getProtectedArticle(slug: string) {
  const [article, { data }] = await Promise.all([
    getArticle(slug),
    getSubscriptionStatus(),
  ]);
  
  if (!article) {
    return null;
  }

  return getArticleDTO(article, data === SUBSCRIPTION_STATUS.ACTIVE);
}
