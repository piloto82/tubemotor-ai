import type {
  ScriptCreatorState,
  ViralTitlesState,
  ScriptTranslatorState,
  ScenePromptsState,
  ThumbnailPromptsState,
  ImageGeneratorState,
  VideoGeneratorState,
  TextToSpeechState,
  SrtConverterState,
  TextSplitterState,
  CapcutOptimizerState,
  PagesState
} from '../types';

const initialScriptCreatorState: ScriptCreatorState = {
  formData: {
    niche: '',
    audience: '',
    theme: '',
    searchTerm: '',
    blocks: 5,
    charsPerBlock: 500,
    language: 'pt-br',
    tone: 'envolvente-misterioso',
    structure: 'roteiro-completo-alta-retencao',
    cta: { start: false, middle: false, end: true },
    narrationOnly: false,
    includeAffiliate: false,
  },
  referenceFileName: null,
  isLoading: false,
  isRefining: false,
  result: '',
  refinementPrompt: '',
};

const initialTextToSpeechState: TextToSpeechState = {
    formData: {
        text: '',
        mode: 'single',
        // FIX: Changed default to empty string for better UX. Placeholder will guide user.
        styleInstructions: '',
        temperature: 1.0,
        singleVoice: 'Zephyr',
        speakers: [
            { speaker: 'Joe', voice: 'Zephyr' },
            { speaker: 'Jane', voice: 'Puck' }
        ],
    },
    isLoading: false,
    error: null,
    audioDataUrl: null,
    loadingPreviewVoice: null,
};


export const initialStates: PagesState = {
  'script-creator': initialScriptCreatorState,
  'viral-titles': {
    formData: { topic: '', generationType: 'ready', language: 'pt-br' },
    isLoading: false, result: '',
  },
  'script-translator': {
    formData: { script: '', languages: { pt: false, en: false, es: false, fr: false, de: false, it: false, jp: false, ko: false } },
    isLoading: false, result: '',
  },
  'scene-prompts': {
    formData: { entryMode: 'script', script: '', aiModel: 'midjourney', style: 'no-style', generationMode: 'auto' },
    isLoading: false, result: '',
  },
  'thumbnail-prompts': {
    formData: { title: '', aiModel: 'midjourney', includePhrase: false },
    isLoading: false, result: '',
  },
  'image-generator': {
    formData: { prompt: '', negativePrompt: '', aiModel: 'imagefx', aspectRatio: '1:1', style: 'realistic', numImages: 1 },
    batchFileName: null, referenceImageName: null, isLoading: false, result: [],
  },
  'video-generator': {
    formData: { prompt: '', resolution: '720p', aspectRatio: '16:9' },
    referenceImageName: null, isLoading: false, loadingMessage: '', result: '', error: '', apiKeySelected: null,
  },
  'text-to-speech': initialTextToSpeechState,
  'srt-converter': {
    formData: { text: '', charLimit: 500 },
    isLoading: false, result: '',
  },
  'text-splitter': {
    formData: { text: '', splitBy: 'words', splitValue: 150 },
    isLoading: false, result: '',
  },
  'capcut-optimizer': {
    formData: { script: '' },
    isLoading: false, result: '',
  },
  'settings': {},
  'faq': {},
};