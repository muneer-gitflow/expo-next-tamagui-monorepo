import { createContext, useContext, useReducer, type ReactNode } from 'react';

export type FeatureId =
  | 'google_auth'
  | 'apple_auth'
  | 'push_notifications'
  | 'analytics'
  | 'offline_mode'
  | 'loyalty_rewards'
  | 'social_sharing'
  | 'dark_mode'
  | 'multi_language'
  | 'payment_options'
  | 'wishlists'
  | 'reviews'
  | 'ar_product_view'
  | 'scan_to_buy'
  | 'store_locator'
  | 'inventory_check'
  | 'size_guide'
  | 'virtual_try_on'
  | 'in_app_chat'
  | 'order_tracking'
  | 'abandoned_cart'
  | 'custom_payment_gateway'
  | 'custom_loyalty_program'
  | 'custom_analytics'
  | 'custom_erp'
  | 'custom_crm';
export type FeatureStatus = 'active' | 'pending' | 'error';

interface FeatureCredentials {
  google_auth?: {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
  };
  push_notifications?: {
    fcm_server_key: string;
    apns_key_id: string;
    apns_team_id: string;
    apns_key_file?: File;
  };
}

export interface Feature {
  id: FeatureId;
  name: string;
  description: string;
  enabled: boolean;
  status: FeatureStatus;
  requiresSetup: boolean;
  credentials?: FeatureCredentials[keyof FeatureCredentials];
  configured: boolean;
  category: string;
  beta?: boolean;
  premium?: boolean;
  icon?: string;
  requiresConsultation?: boolean;
  comingSoon?: boolean;
}

interface FeaturesState {
  features: Feature[];
  credentials: FeatureCredentials;
}

type FeaturesAction =
  | { type: 'TOGGLE_FEATURE'; payload: { id: FeatureId } }
  | { type: 'UPDATE_CREDENTIALS'; payload: { id: FeatureId; credentials: any } }
  | { type: 'UPDATE_STATUS'; payload: { id: FeatureId; status: FeatureStatus } };

const initialFeatures: Feature[] = [
  // Authentication Features
  {
    id: 'google_auth',
    name: 'Google Sign-In',
    description: 'Allow customers to sign in with their Google accounts',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'authentication',
  },
  {
    id: 'apple_auth',
    name: 'Apple Sign-In',
    description: 'Enable Sign in with Apple for iOS users',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'authentication',
    premium: true,
  },

  // Shopping Experience
  {
    id: 'ar_product_view',
    name: 'AR Product View',
    description: 'View products in augmented reality',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'shopping',
    premium: true,
    beta: true,
  },
  {
    id: 'scan_to_buy',
    name: 'Barcode Scanner',
    description: 'Scan product barcodes to quickly find and purchase items',
    enabled: false,
    status: 'pending',
    requiresSetup: false,
    configured: true,
    category: 'shopping',
  },
  {
    id: 'virtual_try_on',
    name: 'Virtual Try-On',
    description: 'Try products virtually using camera',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'shopping',
    premium: true,
    beta: true,
    comingSoon: true,
  },
  {
    id: 'size_guide',
    name: 'Size Guide',
    description: 'Interactive size guide with AR measurements',
    enabled: false,
    status: 'pending',
    requiresSetup: false,
    configured: true,
    category: 'shopping',
  },

  // Store Features
  {
    id: 'store_locator',
    name: 'Store Locator',
    description: 'Find nearby physical stores with directions',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'store',
  },
  {
    id: 'inventory_check',
    name: 'Real-time Inventory',
    description: 'Check product availability across stores',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'store',
  },

  // Customer Support
  {
    id: 'in_app_chat',
    name: 'In-App Chat',
    description: 'Real-time customer support chat',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'support',
    premium: true,
  },
  {
    id: 'order_tracking',
    name: 'Order Tracking',
    description: 'Real-time order and shipment tracking',
    enabled: true,
    status: 'active',
    requiresSetup: true,
    configured: true,
    category: 'support',
  },

  // Marketing & Engagement
  {
    id: 'abandoned_cart',
    name: 'Cart Recovery',
    description: 'Abandoned cart notifications and reminders',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'marketing',
    premium: true,
  },
  {
    id: 'push_notifications',
    name: 'Push Notifications',
    description: 'Send push notifications to mobile devices',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'engagement',
    premium: true,
  },
  {
    id: 'loyalty_rewards',
    name: 'Loyalty & Rewards',
    description: 'Reward customers with points and exclusive perks',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'engagement',
    premium: true,
  },
  {
    id: 'social_sharing',
    name: 'Social Sharing',
    description: 'Enable product sharing on social media platforms',
    enabled: true,
    status: 'active',
    requiresSetup: false,
    configured: true,
    category: 'engagement',
  },
  {
    id: 'dark_mode',
    name: 'Dark Mode',
    description: 'Allow users to switch between light and dark themes',
    enabled: false,
    status: 'pending',
    requiresSetup: false,
    configured: true,
    category: 'appearance',
    beta: true,
  },
  {
    id: 'multi_language',
    name: 'Multi-Language Support',
    description: 'Offer your app in multiple languages',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'localization',
    premium: true,
  },
  {
    id: 'payment_options',
    name: 'Advanced Payment Options',
    description: 'Support for multiple payment methods and currencies',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'payments',
    premium: true,
  },
  {
    id: 'wishlists',
    name: 'Wishlists',
    description: 'Let customers save products for later',
    enabled: false,
    status: 'pending',
    requiresSetup: false,
    configured: true,
    category: 'engagement',
  },
  {
    id: 'reviews',
    name: 'Product Reviews',
    description: 'Enable customer reviews and ratings',
    enabled: true,
    status: 'active',
    requiresSetup: true,
    configured: true,
    category: 'engagement',
  },
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Track detailed user behavior and app usage',
    enabled: true,
    status: 'active',
    requiresSetup: false,
    configured: true,
    category: 'analytics',
  },
  {
    id: 'offline_mode',
    name: 'Offline Mode',
    description: 'Allow app to function without internet connection',
    enabled: false,
    status: 'pending',
    requiresSetup: false,
    configured: true,
    category: 'performance',
  },
  // Custom Integrations
  {
    id: 'custom_payment_gateway',
    name: 'Custom Payment Gateway',
    description: 'Integrate your preferred payment gateway or custom payment solution',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'custom_integration',
    premium: true,
    requiresConsultation: true,
  },
  {
    id: 'custom_loyalty_program',
    name: 'Custom Loyalty Integration',
    description: 'Connect your existing loyalty program or custom rewards system',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'custom_integration',
    premium: true,
    requiresConsultation: true,
  },
  {
    id: 'custom_analytics',
    name: 'Custom Analytics Platform',
    description: 'Integrate your preferred analytics or tracking platform',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'custom_integration',
    premium: true,
    requiresConsultation: true,
  },
  {
    id: 'custom_erp',
    name: 'ERP Integration',
    description: 'Connect your Enterprise Resource Planning (ERP) system',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'custom_integration',
    premium: true,
    requiresConsultation: true,
  },
  {
    id: 'custom_crm',
    name: 'CRM Integration',
    description: 'Integrate your Customer Relationship Management (CRM) system',
    enabled: false,
    status: 'pending',
    requiresSetup: true,
    configured: false,
    category: 'custom_integration',
    premium: true,
    requiresConsultation: true,
  },
];

const initialState: FeaturesState = {
  features: initialFeatures,
  credentials: {},
};

function featuresReducer(state: FeaturesState, action: FeaturesAction): FeaturesState {
  switch (action.type) {
    case 'TOGGLE_FEATURE':
      return {
        ...state,
        features: state.features.map((feature) =>
          feature.id === action.payload.id ? { ...feature, enabled: !feature.enabled } : feature,
        ),
      };
    case 'UPDATE_CREDENTIALS':
      return {
        ...state,
        credentials: {
          ...state.credentials,
          [action.payload.id]: action.payload.credentials,
        },
        features: state.features.map((feature) =>
          feature.id === action.payload.id ? { ...feature, configured: true, status: 'active' } : feature,
        ),
      };
    case 'UPDATE_STATUS':
      return {
        ...state,
        features: state.features.map((feature) =>
          feature.id === action.payload.id ? { ...feature, status: action.payload.status } : feature,
        ),
      };
    default:
      return state;
  }
}

const FeaturesContext = createContext<{
  state: FeaturesState;
  dispatch: React.Dispatch<FeaturesAction>;
} | null>(null);

export function FeaturesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(featuresReducer, initialState);
  return <FeaturesContext.Provider value={{ state, dispatch }}>{children}</FeaturesContext.Provider>;
}

export function useFeatures() {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
}
