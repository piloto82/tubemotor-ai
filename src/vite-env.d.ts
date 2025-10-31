
// This file is required for Vite projects to provide type definitions
// for environment variables and other Vite-specific features.

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY: string;
    // Add other environment variables here if needed
  }
}