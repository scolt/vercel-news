'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {components} from '@/libs/api';
import {Badge} from '@/components/ui/badge';
import {toggleCurrentQueryParam} from '@/libs/utils/query-params';

export interface ArticlesFilterControlsClientProps {
  categories: components['schemas']['Category'][];
}

export function ArticlesFilterControlsClient({
  categories,
}: ArticlesFilterControlsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const activeCategory = params.get('category');
  const updateQueryParams = (slug: string) => {
    const query = toggleCurrentQueryParam('category', slug, params);
    router.push(`${pathname}?${query}`);
  }
  
  return <div className="flex items-center justify-center w-full gap-3 flex-wrap">
    {categories.map((category) => {
      return <Badge
        key={category.slug}
        className="cursor-pointer text-md p-3"
        onClick={() => updateQueryParams(category.slug as string)}
        variant={activeCategory === category.slug ? 'default' : 'outline'}
      >
        {category.name}
      </Badge>
    })}
  </div>
}
