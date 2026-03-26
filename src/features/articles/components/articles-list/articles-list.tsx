import {ArticlePreview} from '@/features/articles/components/article-preview/article-preview';
import {components} from '@/libs/api';

export interface ArticleListProps {
  articles: components['schemas']['Article'][];
}

export function ArticlesList({ articles }: ArticleListProps) {
  return <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {articles.map(article => <ArticlePreview
      key={article.id}
      article={article}
    />)}
  </div>
}
