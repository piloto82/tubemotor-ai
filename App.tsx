
import React, { useState } from 'react';
import type { Page, PagesState } from './types';
import Sidebar from './components/Sidebar';
import ScriptCreator from './components/pages/ScriptCreator';
import ViralTitles from './components/pages/ViralTitles';
import ScriptTranslator from './components/pages/ScriptTranslator';
import ScenePrompts from './components/pages/ScenePrompts';
import ThumbnailPrompts from './components/pages/ThumbnailPrompts';
import ImageGenerator from './components/pages/ImageGenerator';
import VideoGenerator from './components/pages/VideoGenerator';
import TextToSpeech from './components/pages/TextToSpeech';
import SrtConverter from './components/pages/SrtConverter';
import TextSplitter from './components/pages/TextSplitter';
import CapcutOptimizer from './components/pages/CapcutOptimizer';
import HamburgerIcon from './components/icons/HamburgerIcon';
import { initialStates } from './utils/initialStates';

const pageComponents: { [key in Page]: React.ComponentType<any> } = {
  'script-creator': ScriptCreator,
  'viral-titles': ViralTitles,
  'script-translator': ScriptTranslator,
  'scene-prompts': ScenePrompts,
  'thumbnail-prompts': ThumbnailPrompts,
  'image-generator': ImageGenerator,
  'video-generator': VideoGenerator,
  'text-to-speech': TextToSpeech,
  'srt-converter': SrtConverter,
  'text-splitter': TextSplitter,
  'capcut-optimizer': CapcutOptimizer,
  'settings': () => <div className="p-8"><h1 className="text-2xl font-bold">Configurações</h1></div>,
  'faq': () => <div className="p-8"><h1 className="text-2xl font-bold">FAQ</h1></div>,
};

function App() {
  const [activePage, setActivePage] = useState<Page>('script-creator');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pagesState, setPagesState] = useState<PagesState>(initialStates);

  const updatePageData = (page: Page, updater: Partial<PagesState[Page]> | ((prevState: PagesState[Page]) => PagesState[Page])) => {
    setPagesState(prev => {
      const oldPageState = prev[page];
      const newPageState = typeof updater === 'function' 
        ? updater(oldPageState)
        : { ...oldPageState, ...updater };
      return {
        ...prev,
        [page]: newPageState,
      };
    });
  };

  const resetActivePage = () => {
    setPagesState(prev => ({
      ...prev,
      [activePage]: initialStates[activePage]
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        resetActivePage={resetActivePage}
      />
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 bg-white shadow-md p-4 md:hidden z-10">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
            <HamburgerIcon />
          </button>
        </header>
        <div className="relative p-4 sm:p-6 md:p-8">
          {(Object.keys(pageComponents) as Page[]).map(pageKey => {
            const PageComponent = pageComponents[pageKey];
            const isVisible = activePage === pageKey;

            return (
              <div key={pageKey} style={{ display: isVisible ? 'block' : 'none' }}>
                <PageComponent 
                  data={pagesState[pageKey]}
                  updateData={(updater: any) => updatePageData(pageKey, updater)}
                  setActivePage={setActivePage}
                  updateOtherPageData={updatePageData}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
