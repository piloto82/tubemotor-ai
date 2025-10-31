// FIX: Add Language type definition to be used for internationalization.
export type Language = 'en' | 'pt';

// FIX: Add Message type definition for chat components.
export type Message = {
  role: 'user' | 'model';
  text: string;
};

export type Page = 
  | 'script-creator'
  | 'viral-titles'
  | 'script-translator'
  | 'scene-prompts'
  | 'thumbnail-prompts'
  | 'image-generator'
  | 'video-generator'
  | 'text-to-speech'
  | 'srt-converter'
  | 'text-splitter'
  | 'capcut-optimizer'
  | 'settings'
  | 'faq';

// --- Data types for forms ---

export type ScriptCreatorData = {
  niche: string;
  audience: string;
  theme: string;
  searchTerm?: string;
  blocks: number;
  charsPerBlock: number;
  language: string;
  tone: string;
  structure: string;
  cta: {
    start: boolean;
    middle: boolean;
    end: boolean;
  };
  narrationOnly: boolean;
  includeAffiliate: boolean;
  referenceFile?: {
    mimeType: string;
    data: string;
  };
};

export type ViralTitlesData = {
  topic: string;
  generationType: string;
  language: string;
};

export type ScriptTranslatorData = {
  script: string;
  languages: {
    pt: boolean;
    en: boolean;
    es: boolean;
    fr: boolean;
    de: boolean;
    it: boolean;
    jp: boolean;
    ko: boolean;
  };
};

export type ScenePromptsData = {
  entryMode: string;
  script: string;
  aiModel: string;
  style: string;
  generationMode: string;
};

export type ThumbnailPromptsData = {
  title: string;
  aiModel: string;
  includePhrase: boolean;
};

export type ImageGeneratorData = {
  prompt: string;
  negativePrompt: string;
  aiModel: string;
  aspectRatio: string;
  style: string;
  numImages: number;
  batchFile?: File;
  referenceImage?: {
    mimeType: string;
    data: string;
  };
};

export type VideoGeneratorData = {
  prompt: string;
  resolution: string;
  aspectRatio: string;
  referenceImage?: {
    mimeType: string;
    data: string;
  };
};

export type TextToSpeechData = {
  text: string;
  mode: 'single' | 'multi';
  styleInstructions: string;
  temperature: number;
  singleVoice: string;
  speakers: { speaker: string; voice: string }[];
};

export type SrtConverterData = {
  text: string;
  charLimit: number;
};

export type TextSplitterData = {
  text: string;
  splitBy: 'words' | 'chars';
  splitValue: number;
};

export type CapcutOptimizerData = {
  script: string;
};


// --- State types for pages ---

export interface ScriptCreatorState {
  formData: ScriptCreatorData;
  referenceFileName: string | null;
  isLoading: boolean;
  isRefining: boolean;
  result: string;
  refinementPrompt: string;
}

export interface ViralTitlesState {
  formData: ViralTitlesData;
  isLoading: boolean;
  result: string;
}

export interface ScriptTranslatorState {
  formData: ScriptTranslatorData;
  isLoading: boolean;
  result: string;
}

export interface ScenePromptsState {
  formData: ScenePromptsData;
  isLoading: boolean;
  result: string;
}

export interface ThumbnailPromptsState {
  formData: ThumbnailPromptsData;
  isLoading: boolean;
  result: string;
}

export interface ImageGeneratorState {
  formData: ImageGeneratorData;
  batchFileName: string | null;
  referenceImageName: string | null;
  isLoading: boolean;
  result: string[];
}

export interface VideoGeneratorState {
  formData: VideoGeneratorData;
  referenceImageName: string | null;
  isLoading: boolean;
  loadingMessage: string;
  result: string;
  error: string;
  apiKeySelected: boolean | null;
}

export interface TextToSpeechState {
    formData: TextToSpeechData;
    isLoading: boolean;
    error: string | null;
    audioDataUrl: string | null;
    loadingPreviewVoice: string | null;
}

export interface SrtConverterState {
  formData: SrtConverterData;
  isLoading: boolean;
  result: string;
}

export interface TextSplitterState {
  formData: TextSplitterData;
  isLoading: boolean;
  result: string;
}

export interface CapcutOptimizerState {
  formData: CapcutOptimizerData;
  isLoading: boolean;
  result: string;
}

export type PagesState = {
  'script-creator': ScriptCreatorState;
  'viral-titles': ViralTitlesState;
  'script-translator': ScriptTranslatorState;
  'scene-prompts': ScenePromptsState;
  'thumbnail-prompts': ThumbnailPromptsState;
  'image-generator': ImageGeneratorState;
  'video-generator': VideoGeneratorState;
  'text-to-speech': TextToSpeechState;
  'srt-converter': SrtConverterState;
  'text-splitter': TextSplitterState;
  'capcut-optimizer': CapcutOptimizerState;
  'settings': {};
  'faq': {};
};
