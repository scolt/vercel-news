'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {components} from '@/libs/api';
import {Badge} from '@/components/ui/badge';
import {toggleCurrentQueryParam} from '@/libs/utils/query-params';
import {useState, useTransition} from 'react';

export interface ArticlesFilterControlsClientProps {
  categories: components['schemas']['Category'][];
}

export function ArticlesFilterControlsClient({
  categories,
}: ArticlesFilterControlsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [nextRoute, setNextRoute] = useState('');

  const activeCategory = params.get('category');
  const updateQueryParams = (slug: string) => {
    const query = toggleCurrentQueryParam('category', slug, params);
    setNextRoute(slug);
    startTransition(() => {
      router.push(`${pathname}?${query}`);
    });
  }
  
  return <div className="flex items-center justify-center w-full gap-3 flex-wrap">
    {categories.map((category) => {
      let variant: 'outline' | 'disabled' | 'default' = 'outline';
      if (isPending && nextRoute === category.slug) {
        variant = 'disabled';
      } else if (!isPending && activeCategory === category.slug) {
        variant = 'default';
      }
      
      return <Badge
        key={category.slug}
        className="cursor-pointer text-md p-3"
        onClick={() => !isPending && updateQueryParams(category.slug as string)}
        variant={variant}
      >
        {category.name}
      </Badge>
    })}
  </div>
}
