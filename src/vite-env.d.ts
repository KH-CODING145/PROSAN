/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_USERNAME?: string;
  readonly VITE_YOUTUBE_CHANNEL_ID?: string;
  readonly VITE_YOUTUBE_API_KEY?: string;
  readonly VITE_CONTACT_API_ENDPOINT?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
