'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {useState, SubmitEvent, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {updateCurrentQueryParam} from '@/libs/utils/query-params';

export function ArticlesSearchControlClientFallback() {
  return <div className="flex animate-pulse justify-center">
    <div className="w-sm h-9 rounded bg-gray-200" />
  </div>
}

export function ArticlesSearchControlClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const defaultValue = params.get('query');
  const [value, setValue] = useState('');

  useEffect(() => {
    // Sync query value to input
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(defaultValue || '');
  }, [defaultValue])
  
  const submitSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = updateCurrentQueryParam('query', value, params);
    router.push(`${pathname}?${query}`);
  }
  return <form onSubmit={submitSearch} className="flex w-full items-center justify-center gap-4">
    <Input
      className="max-w-sm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
    <Button type="submit">Search</Button>
  </form>
}
