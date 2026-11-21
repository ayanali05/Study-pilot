import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StudyTrack — AKTU SGPA Predictor & PYQ Intelligence',
    short_name: 'StudyTrack',
    description: 'Predict AKTU SGPA, analyze 5-year PYQ repeat probability, and personalized exam study plan for Deepak Pandey.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
