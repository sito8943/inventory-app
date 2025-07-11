const { VITE_API_URL, VITE_CONFIG_FILE, VITE_CONFIG_LOCAL_CACHE } = import.meta
  .env;

export const config = {
  apiUrl: VITE_API_URL,
  configFile: VITE_CONFIG_FILE,
  localCache: VITE_CONFIG_LOCAL_CACHE,
};
