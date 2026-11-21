import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 900,
          borderRadius: 8,
          fontFamily: 'sans-serif',
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.5)',
        }}
      >
        SP
      </div>
    ),
    {
      ...size,
    }
  );
}
