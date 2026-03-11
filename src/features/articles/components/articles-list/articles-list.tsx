import {ArticlePreview} from '@/features/articles/components/article-preview/article-preview';
import {components} from '@/libs/api';

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
