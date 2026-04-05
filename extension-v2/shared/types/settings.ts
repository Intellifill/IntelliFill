/** Extension settings persisted in chrome.storage.local */
export interface ExtensionSettings {
  enabled: boolean;
  apiEndpoint: string;
  cacheMinutes: number;
}

export const DEFAULT_SETTINGS: ExtensionSettings = {
  enabled: true,
  apiEndpoint: import.meta.env.WXT_API_URL ?? 'https://app.intellifill.com/api',
  cacheMinutes: 5,
};
