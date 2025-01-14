export type PublishingPath = 'undecided' | 'our-account' | 'client-account';
export type StoreType = 'both' | 'ios-only' | 'android-only';
export type StoreAccessStatus = 'pending' | 'granted' | 'denied';

interface AppStoreCredentials {
  ios?: {
    issuerId: string;
    keyId: string;
    apiKey: string;
  };
  android?: {
    serviceAccountEmail: string;
    privateKeyJson: string;
  };
}

interface BetaTestingConfig {
  type: 'closed' | 'open';
  maxTesters: number;
  duration: string;
  testGroups?: Array<{
    name: string;
    emails: string[];
  }>;
  feedbackCollection: {
    inAppFeedback: boolean;
    emailCollection: boolean;
    customSurveyUrl?: string;
  };
}

export interface AppMetadata {
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: string;
  website: string;
  supportEmail: string;
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
  appStoreCredentials?: AppStoreCredentials;
  betaConfig?: BetaTestingConfig;
}

export interface AppMedia {
  icon: File | null;
  screenshots: File[];
  previewVideo?: File;
}

export interface AppVersion {
  versionNumber: string;
  buildNumber: string;
  whatsNew: string;
} 