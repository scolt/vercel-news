import {components} from '@/libs/api';

export type ArticleInfoDTO = Omit<components['schemas']['Article'], 'excerpt' | 'content'>;
export type ArticleContentDTO = {
  contentType: 'full' | 'promo';
  content: components['schemas']['Article']['content'];
}

export function getArticleInfoDTO(article: components['schemas']['Article']): ArticleInfoDTO {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    author: article.author,
    image: article.image,
    category: article.category,
    publishedAt: article.publishedAt,
  }
}

export function getArticleContentDto(article: components['schemas']['Article'], isFullContent: boolean): ArticleContentDTO {
  const content = article.content || [];
  const promoSectionsLimit = Math.min(2, Math.floor(content.length / 2));

  return {
    contentType: isFullContent ? 'full' : 'promo',
    content: isFullContent ? content : content.slice(0, promoSectionsLimit),
  }
}

export function getBreakingNewsDto(breakingNews: components['schemas']['BreakingNews'], articleSlug?: string) {
  return {
    title: breakingNews.headline,
    slug: articleSlug || '',
  };
}
