import Image from 'next/image';
import {notFound} from 'next/navigation';
import {getProtectedArticle} from '@/features/articles/queries/get-protected-article';
import BlocksView from '@/components/blocks-view/blocks-view';
import {Typography} from '@/components/ui/typography';
import {Suspense} from "react";
import {SubscriptionButton, SubscriptionButtonFallback} from "@/features/subscriptions";
import {SubscriptionPromo} from "@/features/subscriptions/components/subscription-promo/subscription-promo";

export interface ArticleViewProps {
  slug: string;
}

export async function ArticleView({
  slug,
}: ArticleViewProps) {
  const article = await getProtectedArticle(slug);

  if (!article) {
    notFound();
  }

  return <div className="flex flex-col gap-4">
    <Typography variant="caption">{article.category} | {article.author?.name}</Typography>
    <Typography variant="heading1" as="h1">{article.title}</Typography>
    {article.image && <Image
      alt={article.title || slug}
      src={article.image}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8+R8AAtcB6oaHtZcAAAAASUVORK5CYII="
      height={550}
      width={1024}
    /> }
    <div className="mt-8">
      <BlocksView blocks={article.content} />
    </div>
    {!article.isFullContent ? <Suspense fallback={<SubscriptionButtonFallback />}>
      <SubscriptionPromo />
    </Suspense> : null}
  </div>;
}
