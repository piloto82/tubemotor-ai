
import React from 'react';
import type { Page } from '../types';
import Logo from './Logo';

import ScriptIcon from './icons/ScriptIcon';
import TitleIcon from './icons/TitleIcon';
import TranslateIcon from './icons/TranslateIcon';
import ScenePromptIcon from './icons/ScenePromptIcon';
import ThumbnailPromptIcon from './icons/ThumbnailPromptIcon';
import ImageIcon from './icons/ImageIcon';
import VideoIcon from './icons/VideoIcon';
import SpeakerIcon from './icons/SpeakerIcon';
import SrtIcon from './icons/SrtIcon';
import SplitTextIcon from './icons/SplitTextIcon';
import CapcutIcon from './icons/CapcutIcon';
import SettingsIcon from './icons/SettingsIcon';
import FaqIcon from './icons/FaqIcon';
import ResetIcon from './icons/ResetIcon';
import XIcon from './icons/XIcon';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  resetActivePage: () => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen, setIsOpen, resetActivePage }) => {
  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false); // Close sidebar on navigation
  };
  
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex-shrink-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <Logo />
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <XIcon />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <div>
            <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Criação e Conteúdo</h2>
            <NavLink icon={<ScriptIcon />} label="Criador de Roteiro" isActive={activePage === 'script-creator'} onClick={() => handleNavClick('script-creator')} />
            <NavLink icon={<TitleIcon />} label="Títulos Virais" isActive={activePage === 'viral-titles'} onClick={() => handleNavClick('viral-titles')} />
            <NavLink icon={<TranslateIcon />} label="Tradutor de Roteiros" isActive={activePage === 'script-translator'} onClick={() => handleNavClick('script-translator')} />
          </div>
          <div>
            <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">Mídia e Imagem</h2>
            <NavLink icon={<ScenePromptIcon />} label="Prompts para Cenas" isActive={activePage === 'scene-prompts'} onClick={() => handleNavClick('scene-prompts')} />
            <NavLink icon={<ThumbnailPromptIcon />} label="Prompts de Thumbnail" isActive={activePage === 'thumbnail-prompts'} onClick={() => handleNavClick('thumbnail-prompts')} />
            <NavLink icon={<ImageIcon />} label="Gerador de Imagens" isActive={activePage === 'image-generator'} onClick={() => handleNavClick('image-generator')} />
            <NavLink icon={<VideoIcon />} label="Gerador de Vídeos" isActive={activePage === 'video-generator'} onClick={() => handleNavClick('video-generator')} />
            <NavLink icon={<SpeakerIcon />} label="Gerador de Voz" isActive={activePage === 'text-to-speech'} onClick={() => handleNavClick('text-to-speech')} />
          </div>
          <div>
            <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">Otimização e Gestão</h2>
            <NavLink icon={<SrtIcon />} label="Conversor de SRT" isActive={activePage === 'srt-converter'} onClick={() => handleNavClick('srt-converter')} />
            <NavLink icon={<SplitTextIcon />} label="Divisor de Texto" isActive={activePage === 'text-splitter'} onClick={() => handleNavClick('text-splitter')} />
            <NavLink icon={<CapcutIcon />} label="Otimizador Capcut" isActive={activePage === 'capcut-optimizer'} onClick={() => handleNavClick('capcut-optimizer')} />
          </div>
          <div>
            <h2 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">Sistema</h2>
            <NavLink icon={<SettingsIcon />} label="Configurações" isActive={activePage === 'settings'} onClick={() => handleNavClick('settings')} />
            <NavLink icon={<FaqIcon />} label="FAQ" isActive={activePage === 'faq'} onClick={() => handleNavClick('faq')} />
          </div>
        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
           <button onClick={resetActivePage} className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
            <ResetIcon />
            <span className="ml-3">Zerar Conteúdo</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;