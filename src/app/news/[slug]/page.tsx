import {Metadata, ResolvingMetadata} from 'next';
import {Suspense} from 'react';
import {notFound} from 'next/navigation';
import {ArticleDetails, ArticlesWidgetFallback, getArticle, TrendingArticlesWidget, getArticleInfo, ArticleContent, ArticleContentFallback, getFeaturedArticles, getTrendingArticles} from '@/features/articles';

export async function generateStaticParams() {
  const [{ data: featured }, { data: trending }] = await Promise.all([
    getFeaturedArticles(),
    getTrendingArticles(),
  ]);
  const featuredSlugs = featured?.map(article => article.slug) || [];
  const trendingSlugs = trending?.map(article => article.slug) || [];
  const allSlugs = [...featuredSlugs, ...trendingSlugs];
  return allSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({
 params,
}: PageProps<'/news/[slug]'>, parentMetadata: ResolvingMetadata): Promise<Metadata> {
  const [{ slug }, { openGraph }] = await Promise.all([params, parentMetadata]);
  const article = await getArticle(slug);
  
  if (!article) {
    return { title: 'Not Found' };
  }
  
  return {
    title: article.title,
    description: article.excerpt,
    
    openGraph: {
      ...openGraph,
      type: 'article',
      title: article.title,
      description: article.excerpt,
      authors: article.author?.name ? [article.author.name] : [],
      url: `/news/${slug}`,
      images: article.image,
    },
  }
}

export default async function NewsPage({
  params
}: PageProps<'/news/[slug]'>) {
  const { slug } = await params;
  const articleInfo = await getArticleInfo(slug);
  
  if (!articleInfo) {
    notFound();
  }
  
  return <div className="flex flex-col w-full max-w-4xl m-auto p-4 gap-4">
    <ArticleDetails article={articleInfo} />

    <Suspense fallback={<ArticleContentFallback />}>
      <ArticleContent slug={slug} />
    </Suspense>
    
    <Suspense fallback={<ArticlesWidgetFallback />}>
      <TrendingArticlesWidget excludeId={articleInfo.id}/>
    </Suspense>
  </div>;
}
