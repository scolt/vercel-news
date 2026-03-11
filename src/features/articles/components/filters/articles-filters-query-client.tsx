'use client';

import {Input} from '@/components/ui/input';
import {useState, SubmitEvent} from 'react';
import {Button} from '@/components/ui/button';
import {FilterApplyHandler} from '@/features/articles/components/filters/types';

export interface ArticlesFiltersQueryClientProps {
  currentQuery: string | null;
  isPending: boolean;
  onFilterApply: FilterApplyHandler;
}

export function ArticlesFiltersQueryClient({
  currentQuery,
  isPending,
  onFilterApply,
}: ArticlesFiltersQueryClientProps) {
  const [value, setValue] = useState(currentQuery || '');

  const submitSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterApply('query', value);
  }
  return <form onSubmit={submitSearch} className="flex w-full items-center justify-center gap-4">
    <Input
      className="max-w-sm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    <Button type="submit" disabled={isPending}>Search</Button>
  </form>
}
