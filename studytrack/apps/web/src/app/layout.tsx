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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <I18nProvider>
            <StoreProvider>
              {/* Desktop Sidebar */}
              <Sidebar />

              {/* Main App Content Area */}
              <div className="flex-1 flex flex-col min-w-0">
                <TopNav />
                <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
                  {children}
                </main>
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
