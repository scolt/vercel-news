import {Suspense} from 'react';
import {Metadata} from 'next';
import {Typography} from '@/components/ui/typography';

import {SearchArticlesList, ArticlesFilters, ArticlesFiltersFallback, ArticlesListFallback} from '@/features/articles';

export const metadata: Metadata = { title: 'Search news' };

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

  return <div className="flex flex-col w-full max-w-4xl m-auto p-4 pt-10 gap-12">
    <header className="flex flex-col w-full max-w-3xl items-center m-auto justify-center gap-6">
      <div>
        <Typography variant="heading2" className="text-center">Find news</Typography>
        <Typography variant="heading3" className="text-center hidden sm:flex">that meet with your needs</Typography>
      </div>
      <Suspense fallback={<ArticlesFiltersFallback />}>
        <ArticlesFilters />
      </Suspense>
    </header>
    <main>
      <Suspense key={`${category}-${query}`} fallback={<ArticlesListFallback />}>
        <SearchArticlesList category={category} query={query} />
      </Suspense>
    </main>
  </div>;
}
