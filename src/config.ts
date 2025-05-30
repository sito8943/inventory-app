const { VITE_API_URL, VITE_CONFIG_FILE } = import.meta.env;

export const config = {
  apiUrl: VITE_API_URL,
  configFile: VITE_CONFIG_FILE,
};
