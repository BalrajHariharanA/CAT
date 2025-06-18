/// <reference types="vite/client" />

    interface ImportMetaEnv {
      readonly VITE_WALLET_CONNECT_PROJECTID: string;
      readonly VITE_COINGECKO_API_KEY: string;
      readonly VITE_COINGECKO_API_ENDPOINT: string;
      readonly VITE_FRONT_API_ENDPOINT: string;
      // Add other VITE_ prefixed variables here
    }

    interface ImportMeta {
      readonly env: ImportMetaEnv;
    }
