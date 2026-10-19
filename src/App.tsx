import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCyber } from './components/HeroCyber';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { TechnologySection } from './components/TechnologySection';
import { Footer } from './components/Footer';
import { HeadsetModal } from './components/HeadsetModal';
import { useAnalysis } from './hooks/useAnalysis';
import { PRESET_QUESTIONS } from './data/questions';
import { QuestionItem } from './types/analysis';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isHeadsetModalOpen, setIsHeadsetModalOpen] = useState<boolean>(false);

  const {
    stage,
    selectedPreset,
    setSelectedPreset,
    result,
    logs,
    soundEnabled,
    toggleSound,
    startAnalysis,
    resetAnalysis,
    addLog
  } = useAnalysis();

  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem>(PRESET_QUESTIONS[0]);
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);

  const handleRequestAnalysis = () => {
    // Selalu tampilkan konfirmasi penggunaan perangkat kepala sebelum setiap pengujian
    setIsHeadsetModalOpen(true);
  };

  const handleConfirmHeadset = () => {
    setIsHeadsetModalOpen(false);
    startAnalysis();
  };

  const handleToggleWebcam = () => {
    setIsWebcamActive(prev => {
      const next = !prev;
      addLog(next ? 'KAMERA FISIK DIHUBUNGKAN // STREAM AKTIF' : 'KAMERA DIMATIKAN // KEMBALI KE SIMULASI', 'info');
      return next;
    });
  };

  const handleToggleMic = () => {
    setIsMicActive(prev => {
      const next = !prev;
      addLog(next ? 'MIKROFON AUDIO TERHUBUNG // MENGUKUR SPEKTRUM SUARA' : 'MIKROFON DINONAKTIFKAN', 'info');
      return next;
    });
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToTop = () => {
    handleNavigate('home');
  };

  // Active section detection using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'demo', 'tech'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerOffset = 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - headerOffset;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-ink-primary flex flex-col font-sans cyber-grid">
      
      <Navbar
        onStartAnalysis={handleRequestAnalysis}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1 pt-16 flex flex-col">
        {/* Section 1: Beranda */}
        <HeroCyber
          onGoToDemo={() => handleNavigate('demo')}
          onGoToTech={() => handleNavigate('tech')}
        />

        {/* Section 2: Demo / Workbench */}
        <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 sm:px-6 py-12 max-w-7xl w-full mx-auto border-t border-border-subtle/40">
          <AnalysisDashboard
            stage={stage}
            currentQuestion={currentQuestion}
            onSelectQuestion={setCurrentQuestion}
            selectedPreset={selectedPreset}
            onSelectPreset={setSelectedPreset}
            onAskSubject={handleRequestAnalysis}
            result={result}
            onReset={resetAnalysis}
            logs={logs}
            isWebcamActive={isWebcamActive}
            onToggleWebcam={handleToggleWebcam}
            isMicActive={isMicActive}
            onToggleMic={handleToggleMic}
          />
        </div>

        {/* Section 3: Teknologi */}
        <div className="border-t border-border-subtle/40">
          <TechnologySection />
        </div>
      </main>

      {/* Professional Cyber Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onNavigateSection={handleNavigate}
      />

      {/* Headset confirmation modal – only shown on first analysis run */}
      <HeadsetModal
        isOpen={isHeadsetModalOpen}
        onConfirm={handleConfirmHeadset}
        onClose={() => setIsHeadsetModalOpen(false)}
      />

    </div>
  );
}

export default App;


