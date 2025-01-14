import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { PublishingPath, StoreType, AppMetadata, AppMedia, AppVersion, StoreAccessStatus } from '../types';

interface PublishState {
  wizard: {
    path: PublishingPath;
    storeType: StoreType;
    hasExistingAccounts: boolean;
    currentStep: number;
    launchType: 'beta' | 'production';
  };
  metadata: AppMetadata;
  media: AppMedia;
  version: AppVersion;
  publishStatus: {
    status: 'not_started' | 'in_progress' | 'submitted' | 'in_review' | 'approved' | 'rejected';
    progress: {
      ios?: {
        status: string;
        progress: number;
        message?: string;
        lastUpdated: Date;
      };
      android?: {
        status: string;
        progress: number;
        message?: string;
        lastUpdated: Date;
      };
    };
    timeline: Array<{
      date: Date;
      event: string;
      details?: string;
    }>;
  };
}

type PublishAction =
  | { type: 'UPDATE_WIZARD'; payload: Partial<PublishState['wizard']> }
  | { type: 'UPDATE_METADATA'; payload: Partial<AppMetadata> }
  | { type: 'UPDATE_MEDIA'; payload: Partial<AppMedia> }
  | { type: 'UPDATE_VERSION'; payload: Partial<AppVersion> }
  | { type: 'UPDATE_STATUS'; payload: Partial<PublishState['publishStatus']> }
  | { type: 'RESET' }
  | { type: 'UPDATE_STORE_ACCESS'; payload: { platform: 'ios' | 'android'; status: StoreAccessStatus } };

const PublishContext = createContext<{
  state: PublishState;
  dispatch: React.Dispatch<PublishAction>;
} | null>(null);

function publishReducer(state: PublishState, action: PublishAction): PublishState {
  switch (action.type) {
    case 'UPDATE_WIZARD':
      return { ...state, wizard: { ...state.wizard, ...action.payload } };
    case 'UPDATE_METADATA':
      return { ...state, metadata: { ...state.metadata, ...action.payload } };
    case 'UPDATE_MEDIA':
      return { ...state, media: { ...state.media, ...action.payload } };
    case 'UPDATE_VERSION':
      return { ...state, version: { ...state.version, ...action.payload } };
    case 'UPDATE_STATUS':
      return { ...state, publishStatus: { ...state.publishStatus, ...action.payload } };
    case 'RESET':
      return initialState;
    case 'UPDATE_STORE_ACCESS':
      return {
        ...state,
        publishStatus: {
          ...state.publishStatus,
          progress: {
            ...state.publishStatus.progress,
            [action.payload.platform]: {
              ...state.publishStatus.progress[action.payload.platform],
              status: action.payload.status,
            },
          },
        },
      };
    default:
      return state;
  }
}

const initialState: PublishState = {
  wizard: {
    path: 'undecided',
    storeType: 'both',
    hasExistingAccounts: false,
    currentStep: 0,
    launchType: 'production',
  },
  metadata: {
    name: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    price: '',
    website: '',
    supportEmail: '',
    privacyPolicyUrl: '',
    termsOfServiceUrl: '',
  },
  media: {
    icon: null,
    screenshots: [],
  },
  version: {
    versionNumber: '1.0.0',
    buildNumber: '1',
    whatsNew: '',
  },
  publishStatus: {
    status: 'not_started',
    progress: {},
    timeline: [],
  },
};

export function PublishProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(publishReducer, initialState);

  return <PublishContext.Provider value={{ state, dispatch }}>{children}</PublishContext.Provider>;
}

export function usePublish() {
  const context = useContext(PublishContext);
  if (!context) {
    throw new Error('usePublish must be used within a PublishProvider');
  }
  return context;
}
