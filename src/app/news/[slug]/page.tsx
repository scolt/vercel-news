import {ArticleView} from '@/features/articles/components/article-view/article-view';

export default async function NewsPage({
  params
}: PageProps<'/news/[slug]'>) {
  const { slug } = await params;

  return <div className="flex flex-col w-full max-w-4xl m-auto p-4 gap-12">
    <ArticleView slug={slug} />
  </div>;
}
