'use client';

import {useTransition} from 'react';
import {components} from '@/libs/api';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {updateCurrentQueryParam} from '@/libs/utils/query-params';
import {ArticlesFiltersQueryClient} from './articles-filters-query-client';
import {ArticlesFiltersCategoryClient} from './articles-filters-category-client';
import {FilterApplyHandler} from './types';

export interface ArticlesFiltersClientProps {
  categories: components['schemas']['Category'][];
}

export function ArticlesFiltersClient({
  categories,
}: ArticlesFiltersClientProps) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const onFilterApply: FilterApplyHandler = (key, value) => {
    const query = updateCurrentQueryParam(key, value, params);
    const newUrl = `${pathname}?${query}`;
    
    startTransition(() => {
      router.replace(newUrl);
    })
  }
  
  return <div className="flex flex-col gap-8">
    <ArticlesFiltersCategoryClient
      isPending={isPending}
      categories={categories}
      activeCategory={params.get('category')}
      onFilterApply={onFilterApply} />

    <ArticlesFiltersQueryClient
      isPending={isPending}
      currentQuery={params.get('query')}
      onFilterApply={onFilterApply} />
  </div>
}
