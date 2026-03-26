import {ImageResponse} from 'next/og'

export const size = {width: 1200, height: 628};

export default async function OpengraphArticleImage() {
  return new ImageResponse(
    <div style={{
      display: 'flex',
      backgroundColor: '#333',
      width: '100%',
      height: '100%',
      position: 'relative',
    }}>
      <img 
        src={`${process.env.BASE_APP_URL}/vercel.svg`} 
        alt="Vercel Daily News"
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
        }}
      />
      
      <div style={{
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#fff',
        opacity: 0.8,
      }} />
      <div style={{
        left: 220,
        display: 'flex',
        flexDirection: 'column',
        color: '#333',
        padding: '20px',
        justifyContent: 'center',
        fontWeight: 'bold',
      }}>
        <div style={{
          display: 'flex',
          fontSize: 110,
          lineHeight: 1,
        }}>Vercel</div>
        <div style={{
          display: 'flex',
          fontSize: 60,
          lineHeight: 1,

        }}>Daily News</div>
      </div>
    </div>,
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  )
}
