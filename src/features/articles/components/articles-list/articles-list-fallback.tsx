import {ArticlePreviewFallback} from '@/features/articles/components/article-preview/article-preview-fallback';

export function ArticlesListFallback() {
  const cards = [0,1,3];

  return <div className="flex flex-wrap gap-4 justify-between animate-pulse w-full" aria-label="Loading" role="status">
    {cards.map((card) => <ArticlePreviewFallback key={card} />)}
  </div>;
}
