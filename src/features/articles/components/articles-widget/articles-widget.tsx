import {components} from '@/libs/api';
import {Typography} from '@/components/ui/typography';
import {ArticlesList} from '@/features/articles/components/articles-list/articles-list';
import Link from 'next/link';

export interface ArticlesWidgetProps {
  title: string
  subtitle?: string;
  articles: components['schemas']['Article'][];
}

export function ArticlesWidget({
  title,
  subtitle,
  articles,
}: ArticlesWidgetProps) {
  return <section className="flex flex-col gap-4">
    <header className="flex flex-col sm:flex-row justify-between">
      <div>
        <Typography variant="heading3" as="h3">
          {title}
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          {subtitle}
        </Typography>
      </div>
      <Link href="/search" className="w-full sm:w-auto">
        View all <span className="hidden sm:inline">news</span>
      </Link>
    </header>
    <ArticlesList articles={articles} />
  </section>
}
