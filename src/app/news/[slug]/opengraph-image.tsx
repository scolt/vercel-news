import {ImageResponse} from 'next/og'
import {getArticle} from '@/features/articles/queries/get-article';

export const size = {width: 1024, height: 512};

export default async function OpengraphArticleImage({
  params,
}: PageProps<'/news/[slug]'>) {
  const {slug} = await params;
  const article = await getArticle(slug);
  if (!article) {
    return null;
  }

  return new ImageResponse(
    <div style={{
      backgroundColor: '#333',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      padding: '40px',
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      <div style={{
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#333',
        opacity: 0.5,
      }} />
      <div style={{
        display: 'flex',
        alignSelf: 'flex-start',
        backgroundColor: '#000',
        color: '#fff',
        padding: '20px',
        fontSize: 30,
        fontWeight: 'bold',
      }}>
        Vercel Daily News
      </div>
      <div style={{
        display: 'flex',
        fontSize: 60,
        fontWeight: 'bold',
        width: '80%',
        color: '#eaeaea'
      }}>
        {article.title}
      </div>
    </div>,
    size
  )
}
