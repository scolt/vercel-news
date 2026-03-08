import {ArticlePreview, ArticlePreviewFallback} from '@/features/articles/components/article-preview';
import {components} from '@/libs/api';

export function ArticlesListFallback() {
  const cards = [0,1,3];

  return <div className="flex flex-wrap gap-4 justify-between animate-pulse w-full" aria-label="Loading" role="status">
    {cards.map((card) => <ArticlePreviewFallback key={card} />)}
  </div>;
}

export interface ArticleListProps {
  articles: components['schemas']['Article'][];
}

export function ArticlesList({ articles }: ArticleListProps) {
  return <div className="w-full flex flex-wrap gap-4 justify-between">
    {articles.map(article => <ArticlePreview
      key={article.id}
      article={article}
    />)}
  </div>
}
