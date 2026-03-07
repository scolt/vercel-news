import {getFeaturedArticles} from '@/features/articles/queries/get-featured-articles';
import {ArticlePreview} from '@/features/articles/components/article-preview';
import {Typography} from '@/components/ui/typography';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export async function FeaturedArticlesListFallback() {
  const cards = [0,1,3];

  return <div className="flex flex-wrap gap-4 justify-between animate-pulse" aria-label="Loading" role="status">
    {cards.map((card) => <div key={card} className="flex flex-col gap-3 w-full md:w-[calc(33%-0.66rem)] sm:w-[calc(50%-0.5rem)]">
      <div>
        <div className="h-40 w-full rounded bg-gray-200"></div>
      </div>
      <div className="flex gap-2 justify-between">
        <div className="h-3 w-20 rounded bg-gray-200" />
        <div className="h-3 w-20 rounded bg-gray-200" />
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
      </div>
      <div className="flex flex-col gap-2 justify-between">
        <div className="h-2 w-full rounded bg-gray-200" />
        <div className="h-2 w-full rounded bg-gray-200" />
      </div>
    </div>)}
  </div>;
}

export async function FeaturedArticlesList() {
  const { error, data } = await getFeaturedArticles();

  if (error) {
    // silently hide the section, for MVP it is enough, better to have some UI message
    return null;
  }
  
  if (!data || data.length === 0) {
    return <div>
      <Typography variant="body2">There is no featured news for today.</Typography>
      <Link href="/news">
        <Button>View all news</Button>
      </Link>
    </div>
  }

  return <div className="flex flex-wrap gap-4 justify-between">
    {data.map(article => <ArticlePreview 
      key={article.id}
      article={article}
    />)}
  </div>
}
