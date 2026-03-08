import {Typography} from '@/components/ui/typography';
import {
  ArticlesFilterControls,
  ArticlesFilterControlsFallback
} from '@/features/articles/components/articles-filter-controls';
import {Suspense} from 'react';
import {ArticlesSearchControlClient} from '@/features/articles/components/articles-search-control-client';
import {SearchArticlesList} from '@/features/articles/components/search-articles-list';
import {ArticlesListFallback} from '@/features/articles/components/articles-list';

export const metadata = { title: 'Search news' };

export interface SearchPageSearchParams {
  category: string;
  query: string;
}

export interface SearchPageProps {
  searchParams: Promise<SearchPageSearchParams>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { category, query } = await searchParams;

  return <div className="flex flex-col w-full max-w-4xl m-auto pt-10 gap-12">
    <header className="flex flex-col max-w-3xl items-center m-auto justify-center gap-6">
      <div>
        <Typography variant="heading2" className="text-center">Find news</Typography>
        <Typography variant="heading3" className="text-center hidden sm:flex">that meet with your needs</Typography>
      </div>
      <Suspense fallback={<ArticlesFilterControlsFallback />}>
        <ArticlesFilterControls />
      </Suspense>
      <Suspense>
        <ArticlesSearchControlClient />
      </Suspense>
    </header>
    <Suspense key={`${category}-${query}`} fallback={<ArticlesListFallback />}>
      <SearchArticlesList category={category} query={query} />
    </Suspense>
  </div>;
}
