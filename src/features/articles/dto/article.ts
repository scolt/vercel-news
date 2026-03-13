import {components} from '@/libs/api';

export type ArticleDTO = Omit<components['schemas']['Article'], 'id'> & {
  isFullContent: boolean;
}

export function getArticleDTO(article: components['schemas']['Article'], isFullContent: boolean): ArticleDTO {
  const content = article.content || [];
  const promoSectionsLimit = Math.min(2, Math.floor(content.length / 2));

  return {
    slug: article.slug,
    title: article.title,
    author: article.author,
    image: article.image,
    category: article.category,
    publishedAt: article.publishedAt,
    content: isFullContent ? content : content.slice(0,promoSectionsLimit),
    isFullContent: isFullContent,
  }
}

export function getBreakingNewsDto(breakingNews: components['schemas']['BreakingNews'], articleSlug?: string) {
  return {
    title: breakingNews.headline,
    slug: articleSlug || '',
  };
}
