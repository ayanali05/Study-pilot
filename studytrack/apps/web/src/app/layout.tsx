import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { I18nProvider } from '../context/I18nContext';
import { StoreProvider } from '../context/StoreContext';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { CommandPalette } from '../components/CommandPalette';
import { JudgeModeModal } from '../components/JudgeModeModal';
import { GuidedTour } from '../components/GuidedTour';

export const metadata: Metadata = {
  title: 'StudyTrack — AKTU SGPA Predictor & PYQ Intelligence',
  description:
    'StudyTrack tells an AKTU student exactly what to study next to raise their SGPA the most, by combining actual syllabus coverage with 5-year PYQ intelligence.',
  authors: [{ name: 'Deepak Pandey' }],
  keywords: ['AKTU', 'SGPA Predictor', 'PYQ Intelligence', 'Computer Science', 'Semester 3', 'StudyTrack'],
  openGraph: {
    title: 'StudyTrack — AKTU SGPA Predictor & PYQ Intelligence',
    description: 'Predict AKTU SGPA with actual syllabus coverage + 5-year PYQ repeat intelligence.',
    type: 'website',
    locale: 'en_US',
    siteName: 'StudyTrack',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyTrack — AKTU SGPA Predictor & PYQ Intelligence',
    description: 'Predict AKTU SGPA with actual syllabus coverage + 5-year PYQ repeat intelligence.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased bg-[#030712] text-slate-100 flex min-h-screen relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
        {/* Animated Floating Cosmic Aurora Orbs */}
        <div className="aurora-bg" aria-hidden="true">
          <div className="aurora-blob-1" />
          <div className="aurora-blob-2" />
          <div className="aurora-blob-3" />
        </div>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <I18nProvider>
            <StoreProvider>
              <div className="flex w-full min-h-screen relative z-10">
                {/* Desktop Floating Glass Sidebar */}
                <Sidebar />

                {/* Main App Content Area */}
                <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
                  <TopNav />
                  <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
                    {children}
                  </main>
                </div>
              </div>

              {/* Modals & Overlays */}
              <CommandPalette />
              <JudgeModeModal />
              <GuidedTour />
            </StoreProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
