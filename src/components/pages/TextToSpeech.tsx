import React, { useState, useRef, useEffect, useCallback } from 'react';
import Textarea from '../ui/Textarea';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { generateSpeech, generateVoiceSample } from '../../services/geminiService';
import { ALL_VOICE_OPTIONS } from '../../utils/constants';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import type { TextToSpeechState } from '../../types';

// --- ICONS (in-component to reduce file clutter) ---
const SpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>;
const PauseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const SpinnerIcon = () => <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
const MoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const SpeedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;

// --- AUDIO HELPERS ---
const decodeBase64 = (base64: string): Uint8Array => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};

const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
};

const pcmToWav = (pcmData: Uint8Array, sampleRate: number, numChannels: number, bitsPerSample: number): Uint8Array => {
    const format = 1; // PCM
    const subChunk1Size = 16;
    const blockAlign = numChannels * (bitsPerSample / 8);
    const byteRate = sampleRate * blockAlign;
    const dataSize = pcmData.byteLength;
    const chunkSize = 36 + dataSize;

    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    writeString(view, 0, 'RIFF');
    view.setUint32(4, chunkSize, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, subChunk1Size, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);
    new Uint8Array(buffer, 44).set(pcmData);

    return new Uint8Array(buffer);
};

// --- SUB-COMPONENTS ---
const VoiceSelector: React.FC<{
    selectedVoice: string,
    onSelect: (voice: string) => void,
    loadingPreview: string | null,
    onPreview: (voice: string) => void,
}> = ({ selectedVoice, onSelect, loadingPreview, onPreview }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedVoiceDetails = ALL_VOICE_OPTIONS.find(v => v.value === selectedVoice);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm flex items-center justify-between">
                <span className="flex items-center">
                    <SpeakerIcon />
                    <div>
                        <p className="font-medium text-gray-800">{selectedVoiceDetails?.label}</p>
                        <p className="text-xs text-gray-500">{selectedVoiceDetails?.description}</p>
                    </div>
                </span>
                <span className="pointer-events-none"><ChevronDownIcon /></span>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {ALL_VOICE_OPTIONS.map(voice => (
                        <div key={voice.value} onClick={() => { onSelect(voice.value); setIsOpen(false); }} className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 flex items-center justify-between group">
                           <div>
                                <p className="font-normal block truncate">{voice.label}</p>
                                <p className="text-xs text-gray-500">{voice.description}</p>
                            </div>
                            <button type="button" onClick={(e) => { e.stopPropagation(); onPreview(voice.value); }} className="p-1 rounded-full hover:bg-gray-200 group-hover:opacity-100 opacity-0 transition-opacity">
                               {loadingPreview === voice.value ? <SpinnerIcon /> : <PlayIcon />}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const AudioPlayer: React.FC<{ audioDataUrl: string }> = ({ audioDataUrl }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };
        const setAudioTime = () => setCurrentTime(audio.currentTime);
        const setAudioEnd = () => setIsPlaying(false);

        audio.addEventListener("loadeddata", setAudioData);
        audio.addEventListener("timeupdate", setAudioTime);
        audio.addEventListener("ended", setAudioEnd);
        
        audio.play().catch(() => {}); // Autoplay
        setIsPlaying(true);

        return () => {
            audio.removeEventListener("loadeddata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
            audio.removeEventListener("ended", setAudioEnd);
        };
    }, [audioDataUrl]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    
    const formatTime = (time: number) => {
        if (isNaN(time) || time === Infinity) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleRateChange = (rate: number) => {
        if (audioRef.current) {
            audioRef.current.playbackRate = rate;
            setPlaybackRate(rate);
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-4">
            <audio ref={audioRef} src={audioDataUrl} />
            <button onClick={togglePlayPause} className="text-gray-700 hover:text-blue-600">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div className="text-sm text-gray-600">{formatTime(currentTime)} / {formatTime(duration)}</div>
            <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.01"
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{ backgroundSize: `${(currentTime / duration) * 100}% 100%` }}
            />
            <div className="relative" ref={menuRef}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600 p-1">
                    <MoreIcon />
                </button>
                {isMenuOpen && (
                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1">
                            <a href={audioDataUrl} download="tubemotor_ai_audio.mp4" className="text-gray-700 px-4 py-2 text-sm flex items-center hover:bg-gray-100">
                                <DownloadIcon /> Baixar
                            </a>
                            <div className="text-gray-700 px-4 pt-2 pb-1 text-sm flex items-center"><SpeedIcon /> Velocidade</div>
                            {[0.5, 1, 1.5, 2].map(rate => (
                                <button key={rate} onClick={() => handleRateChange(rate)} className={`w-full text-left px-8 py-1 text-sm ${playbackRate === rate ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                                    {rate === 1 ? 'Normal' : `${rate}x`}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


interface TextToSpeechProps {
  data: TextToSpeechState;
  updateData: (updater: Partial<TextToSpeechState> | ((prevState: TextToSpeechState) => TextToSpeechState)) => void;
}

// --- MAIN COMPONENT ---
const TextToSpeech: React.FC<TextToSpeechProps> = ({ data, updateData }) => {
    const { formData, isLoading, error, audioDataUrl, loadingPreviewVoice } = data;
    const { mode, text, styleInstructions, temperature, singleVoice, speakers } = formData;

    const previewAudioRef = useRef<HTMLAudioElement | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(true);

    const handleFormDataChange = (field: keyof typeof formData, value: any) => {
      updateData({ formData: { ...formData, [field]: value } });
    };

    const handleSpeakerChange = (index: number, field: 'speaker' | 'voice', value: string) => {
        const newSpeakers = [...speakers];
        newSpeakers[index] = { ...newSpeakers[index], [field]: value };
        handleFormDataChange('speakers', newSpeakers);
    };

    const playPreview = useCallback((base64Audio: string) => {
        const pcmBytes = decodeBase64(base64Audio);
        const wavBytes = pcmToWav(pcmBytes, 24000, 1, 16);
        const blob = new Blob([wavBytes], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);

        if (!previewAudioRef.current) {
            previewAudioRef.current = new Audio();
        }
        previewAudioRef.current.src = url;
        previewAudioRef.current.play();
    }, []);

    const handlePreviewVoice = async (voiceName: string) => {
        updateData({ loadingPreviewVoice: voiceName });
        const response = await generateVoiceSample(voiceName);
        if (!response.startsWith('Ocorreu um erro')) {
            playPreview(response);
        }
        updateData({ loadingPreviewVoice: null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, audioDataUrl: null, error: null });
        
        const response = await generateSpeech(formData);
        
        if (response.startsWith('Ocorreu um erro')) {
            updateData({ error: response, isLoading: false });
        } else {
            const pcmBytes = decodeBase64(response);
            const wavBytes = pcmToWav(pcmBytes, 24000, 1, 16);
            const blob = new Blob([wavBytes], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            updateData({ audioDataUrl: url, isLoading: false });
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerador de Voz (TTS)</h1>
                <p className="text-gray-500 mt-1">Converta seu texto em áudio com vozes realistas e controle total.</p>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna de Texto e Resultado */}
                    <div className="lg:col-span-2 space-y-6">
                        <Input
                            label="Style instructions"
                            id="styleInstructions"
                            name="styleInstructions"
                            value={styleInstructions}
                            onChange={(e) => handleFormDataChange('styleInstructions', e.target.value)}
                            placeholder="ex: Read in a cheerful voice"
                        />
                        <Textarea
                            label="Text"
                            name="text"
                            id="text"
                            placeholder="Digite ou cole o texto aqui..."
                            value={text}
                            onChange={(e) => handleFormDataChange('text', e.target.value)}
                            required
                            rows={15}
                            className="text-lg leading-relaxed"
                        />
                        {error && (
                            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                                <h2 className="font-bold mb-1">Erro na Geração</h2>
                                <p>{error}</p>
                            </div>
                        )}
                        {audioDataUrl && !error && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Áudio Gerado</h2>
                                <AudioPlayer audioDataUrl={audioDataUrl} />
                            </div>
                        )}
                    </div>

                    {/* Coluna de Configurações */}
                    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md h-fit">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Configurações</h2>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                            <div className="flex rounded-md shadow-sm">
                                <button type="button" onClick={() => handleFormDataChange('mode', 'single')} className={`w-full py-2 px-4 text-sm font-medium border ${mode === 'single' ? 'bg-blue-600 text-white border-blue-600 z-10' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} rounded-l-md`}>Single-speaker</button>
                                <button type="button" onClick={() => handleFormDataChange('mode', 'multi')} className={`w-full py-2 px-4 text-sm font-medium border-t border-b border-r ${mode === 'multi' ? 'bg-blue-600 text-white border-blue-600 z-10' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} rounded-r-md`}>Multi-speaker</button>
                            </div>
                        </div>
                        
                        <div>
                            <button type="button" onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="flex justify-between items-center w-full text-left">
                                <span className="text-sm font-medium text-gray-700">Model settings</span>
                                <ChevronDownIcon />
                            </button>
                            {isSettingsOpen && (
                                <div className="mt-4 space-y-4">
                                    <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature</label>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            id="temperature"
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={temperature}
                                            onChange={(e) => handleFormDataChange('temperature', Number(e.target.value))}
                                            className="w-full"
                                        />
                                        <span className="text-sm text-gray-600 w-8 text-center">{temperature}</span>
                                    </div>
                                </div>
                            )}
                        </div>


                        {mode === 'single' ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Voice</label>
                                <VoiceSelector selectedVoice={singleVoice} onSelect={(v) => handleFormDataChange('singleVoice', v)} onPreview={handlePreviewVoice} loadingPreview={loadingPreviewVoice} />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Locutor 1</label>
                                    <Input label="" id="speaker1Name" name="speaker1Name" value={speakers[0].speaker} onChange={e => handleSpeakerChange(0, 'speaker', e.target.value)} placeholder="Nome do Locutor 1" />
                                    <div className="mt-2">
                                        <VoiceSelector selectedVoice={speakers[0].voice} onSelect={(v) => handleSpeakerChange(0, 'voice', v)} onPreview={handlePreviewVoice} loadingPreview={loadingPreviewVoice} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Locutor 2</label>
                                    <Input label="" id="speaker2Name" name="speaker2Name" value={speakers[1].speaker} onChange={e => handleSpeakerChange(1, 'speaker', e.target.value)} placeholder="Nome do Locutor 2" />
                                    <div className="mt-2">
                                        <VoiceSelector selectedVoice={speakers[1].voice} onSelect={(v) => handleSpeakerChange(1, 'voice', v)} onPreview={handlePreviewVoice} loadingPreview={loadingPreviewVoice} />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">Formate seu texto como um diálogo, por exemplo: <br /> <code className="bg-gray-100 p-1 rounded">{speakers[0].speaker}: Olá!</code><br/><code className="bg-gray-100 p-1 rounded">{speakers[1].speaker}: Oi, tudo bem?</code></p>
                            </div>
                        )}

                        <div className="pt-4">
                            <Button type="submit" isLoading={isLoading}>Gerar Áudio</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TextToSpeech;