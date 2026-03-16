import {getTrendingArticles} from '@/features/articles/queries/get-trending-articles';
import {ArticlesWidget} from '@/features/articles/components/articles-widget/articles-widget';

export interface TrendingArticlesWidgetProps {
  excludeId?: string;
}

export async function TrendingArticlesWidget({
  excludeId,
}: TrendingArticlesWidgetProps) {
  const { data, error } = await getTrendingArticles(excludeId);

  if (error || !data || !data.length) {
    return null;
  }

  return <ArticlesWidget title="Trending" subtitle="The most discussed stories right now" articles={data} />
}
