import {getFeaturedArticles} from '@/features/articles/queries/get-featured-articles';
import {Typography} from '@/components/ui/typography';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {ArticlesList} from '@/features/articles/components/articles-list/articles-list';

export async function FeaturedArticlesList() {
  const articles = await getFeaturedArticles();
  
  if (articles.length === 0) {
    return <div>
      <Typography variant="body2">There is no featured news for today.</Typography>
      <Link href="/search">
        <Button>View all news</Button>
      </Link>
    </div>
  }
  
  return <ArticlesList articles={articles} />;
}
