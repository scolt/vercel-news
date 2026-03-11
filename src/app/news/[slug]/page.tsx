import {Metadata} from 'next';
import {ArticleView} from '@/features/articles/components/article-view/article-view';
import {getArticle} from '@/features/articles/queries/get-article';
import {env} from '@/libs/utils/env';

export async function generateMetadata({
 params
}: PageProps<'/news/[slug]'>): Promise<Metadata> {
  const { slug} = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return { title: 'Not Found' };
  }
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      authors: article.author?.name,
      url: `${env.appUrl}/news/${slug}`,
    },
  }
}

export default async function NewsPage({
  params
}: PageProps<'/news/[slug]'>) {
  const { slug } = await params;

  return <div className="flex flex-col w-full max-w-4xl m-auto p-4 gap-12">
    <ArticleView slug={slug} />
  </div>;
}
