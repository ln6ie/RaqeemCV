export interface RemoteConfig {
  latestVersion: string;
  minimumRequiredVersion: string;
  features: {
    en: string[];
    ar: string[];
  };
  updateUrl: string;
}

export interface VersionCache {
  data: RemoteConfig;
  timestamp: number;
}
