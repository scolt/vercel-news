import {Typography} from '@/components/ui/typography';
import {ArticlesFiltersFallback} from '@/features/articles/components/filters/articles-filters-fallback';
import {ArticlesListFallback} from '@/features/articles/components/articles-list/articles-list-fallback';

export default function Loading() {
  return <div aria-label="Loading" role="status" className="flex flex-col w-full max-w-4xl m-auto p-4 pt-10 gap-12">
    <div className="flex flex-col w-full max-w-3xl items-center m-auto justify-center gap-6">
      <div>
        <Typography variant="heading2" className="text-center">Find news</Typography>
        <Typography variant="heading3" className="text-center hidden sm:flex">that meet with your needs</Typography>
      </div>
      <ArticlesFiltersFallback/>
    </div>
    <ArticlesListFallback/>
  </div>;
}
