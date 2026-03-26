import {ArticlePreviewFallback} from '@/features/articles/components/article-preview/article-preview-fallback';

export function ArticlesListFallback() {
  const cards = [0,1,3];

  return <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full" aria-label="Loading" role="status">
    {cards.map((card) => <ArticlePreviewFallback key={card} />)}
  </div>;
}
