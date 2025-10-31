export {};

declare global {
  // FIX: Define an explicit interface for the aistudio object to avoid type conflicts.
  // Moved AIStudio interface into declare global to resolve type conflict.
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}