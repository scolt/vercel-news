import { getArticleInfoDTO } from '../dto/article';
import { getArticle } from './get-article';

export async function getArticleInfo(slug: string) {
    const article = await getArticle(slug);

    if (!article) {
        return null;
    }

    return getArticleInfoDTO(article);
}