import {getFeaturedArticles} from '@/features/articles/queries/get-featured-articles';
import {ArticlesWidget} from '@/features/articles/components/articles-widget/articles-widget';

export async function FeaturedArticlesWidget () {
  const { data, error } = await getFeaturedArticles();

  if (error || !data || !data.length ) {
    // we are safe to hide the entire widget if there are no articles or error occurs
    return null;
  }
  
  return <ArticlesWidget title="Featured" subtitle="Handpicked stories from the team" articles={data} />;
}
