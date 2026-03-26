'use client';

import {useState} from 'react';
import {components} from '@/libs/api';
import {Badge} from '@/components/ui/badge';
import {Loader2} from 'lucide-react';
import {FilterApplyHandler} from './types';

export interface ArticlesFiltersCategoryClientProps {
  categories: components['schemas']['Category'][];
  activeCategory: string | null;
  isPending: boolean;
  onFilterApply: FilterApplyHandler;
}

export function ArticlesFiltersCategoryClient({
  categories,
  isPending,
  activeCategory,
  onFilterApply,
}: ArticlesFiltersCategoryClientProps) {
  const [pendingCategory, setPendingCategory] = useState(activeCategory);
  const updateQueryParams = (slug: string) => {
    setPendingCategory(slug);
    onFilterApply('category', slug);
  }
  
  return <div className="flex items-center justify-center w-full gap-3 flex-wrap">
    {categories.map((category) => {
      const isCategoryLoading = isPending && pendingCategory === category.slug;
      const isActive = !isPending && activeCategory === category.slug;
      let variant: 'outline' | 'disabled' | 'default' = 'outline';

      if (isCategoryLoading) {
        variant = 'disabled';
      }

      if (isActive) {
        variant = 'default';
      }
      
      return <Badge
        key={category.slug}
        role="button"
        className="cursor-pointer text-md p-3 relative"
        onClick={() => !isPending && updateQueryParams(category.slug as string)}
        variant={variant}
      >
        {isCategoryLoading ? <Loader2 className="absolute animate-spin" /> : null}
        <span className={isCategoryLoading ? 'invisible' : 'visible'}>
          {category.name}
        </span>
      </Badge>
    })}
  </div>
}
