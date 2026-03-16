import {Typography} from '@/components/ui/typography';
import {ArticlesList} from '@/features/articles/components/articles-list/articles-list';
import {getFilteredArticles} from '@/features/articles/queries/get-filtered-articles';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export interface SearchArticlesListProps {
  category?: string;
  query?: string;
}

export async function SearchArticlesList(props: SearchArticlesListProps) {
  const { error, data } = await getFilteredArticles(props);

  if (error) {
    return <div className="flex flex-col items-center justify-center w-full gap-2">
      <Typography variant="heading3">Something went wrong</Typography>
      <Typography variant="body2">Please try again later</Typography>
    </div>;
  }

  if (!data || data.length === 0) {
    return <div className="flex flex-col items-center justify-center w-full gap-2">
      <Typography variant="body2">There are no news for now.</Typography>
      <Link href="/search">
        <Button variant="default">View all news</Button>
      </Link>
    </div>;
  }

  return <ArticlesList articles={data} />;
}
