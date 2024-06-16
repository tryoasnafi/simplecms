import { ArticleDocument } from 'src/articles/schema/article.schema';
import { ArticleResponse } from '../response';

export const articleToResponse = (
  article: ArticleDocument,
): ArticleResponse => {
  return {
    id: article._id.toString(),
    title: article.title,
    content: article.content,
    author: article.author,
    createdAt: new Date(article.createdAt as string),
    updatedAt: new Date(article.updatedAt as string),
  };
};
