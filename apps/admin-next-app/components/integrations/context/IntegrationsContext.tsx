import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  CreditCard, // Stripe, PayPal
  Truck, // Shippo
  Package, // EasyPost
  Mail, // Mailchimp
  MessageSquare, // Klaviyo
  Bell, // Firebase
  BarChart3, // Google Analytics
  LineChart, // Mixpanel
  Headphones, // Zendesk
  MessageCircle, // Intercom
  Building2, // NetSuite
  BoxesIcon, // DEAR Systems
  ShoppingBag, // Amazon
  Store, // eBay
  Settings,
  Smartphone,
  Gift,
  Megaphone,
  Workflow,
  Zap,
  Bot,
  QrCode,
  Fingerprint,
  Share2,
  Users2,
  Repeat,
  ShoppingCart,
  Palette,
  Layout,
  Sparkles,
} from 'lucide-react';
import { ghlFeatures, type GHLFeatureKey } from './ghl-features';

export type IntegrationType =
  | 'payment'
  | 'shipping'
  | 'marketing'
  | 'analytics'
  | 'crm'
  | 'erp'
  | 'marketplace'
  | 'mobile'
  | 'automation'
  | 'customization'
  | 'social';

export interface Integration {
  id: string;
  name: string;
  description: string;
  type: IntegrationType;
  enabled: boolean;
  status: 'active' | 'pending' | 'error';
  icon: React.FC;
  iconColor?: string;
  requiresSetup: boolean;
  configured: boolean;
  popular?: boolean;
  premium?: boolean;
  requiresPlus?: boolean;
  partnerStatus?: 'official' | 'certified' | 'community';
  documentation?: string;
  setupGuide?: string;
  ghlFeature?: GHLFeatureKey;
}

interface IntegrationsState {
  integrations: Integration[];
}

type IntegrationsAction =
  | { type: 'TOGGLE_INTEGRATION'; payload: { id: string } }
  | { type: 'UPDATE_STATUS'; payload: { id: string; status: Integration['status'] } };

const initialIntegrations: Integration[] = [
  // Payment & Checkout Integrations
  {
    id: 'shopify_payments',
    name: 'Shopify Payments',
    description: 'Native payment solution with Shop Pay and local payment methods',
    type: 'payment',
    enabled: true,
    status: 'active',
    icon: () => <CreditCard size={24} color="#95BF47" />, // Shopify green
    requiresSetup: false,
    configured: true,
    popular: true,
    partnerStatus: 'official',
  },
  {
    id: 'shop_pay_installments',
    name: 'Shop Pay Installments',
    description: 'Buy now, pay later with Shop Pay Installments',
    type: 'payment',
    enabled: false,
    status: 'pending',
    icon: () => <CreditCard size={24} color="#5A31F4" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'custom_checkout',
    name: 'Custom Checkout',
    description: 'Customize checkout experience with Shopify Checkout Extensions',
    type: 'payment',
    enabled: false,
    status: 'pending',
    icon: () => <Settings size={24} color="#000000" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    requiresPlus: true,
    partnerStatus: 'official',
  },

  // Mobile App Features
  {
    id: 'shop_app_clips',
    name: 'App Clips (iOS)',
    description: 'Enable instant app experiences on iOS with App Clips',
    type: 'mobile',
    enabled: false,
    status: 'pending',
    icon: () => <Smartphone size={24} color="#000000" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'instant_app',
    name: 'Instant App (Android)',
    description: 'Android Instant Apps for quick access without installation',
    type: 'mobile',
    enabled: false,
    status: 'pending',
    icon: () => <Smartphone size={24} color="#3DDC84" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },

  // Customer Engagement
  {
    id: 'shopify_inbox',
    name: 'Shopify Inbox',
    description: 'Chat with customers through your mobile app',
    type: 'crm',
    enabled: false,
    status: 'pending',
    icon: () => <MessageCircle size={24} color="#95BF47" />,
    requiresSetup: true,
    configured: false,
    popular: true,
    partnerStatus: 'official',
  },
  {
    id: 'shop_loyalty',
    name: 'Shop Cash',
    description: 'Reward customers with Shop Cash and points',
    type: 'marketing',
    enabled: false,
    status: 'pending',
    icon: () => <Gift size={24} color="#5A31F4" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },

  // Marketing Tools
  {
    id: 'shopify_email',
    name: 'Shopify Email',
    description: 'Send branded emails and notifications through your app',
    type: 'marketing',
    enabled: false,
    status: 'pending',
    icon: () => <Mail size={24} color="#95BF47" />,
    requiresSetup: true,
    configured: false,
    partnerStatus: 'official',
  },
  {
    id: 'shop_marketing',
    name: 'Shop Marketing',
    description: 'Promote your app in the Shop app',
    type: 'marketing',
    enabled: false,
    status: 'pending',
    icon: () => <Megaphone size={24} color="#5A31F4" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },

  // Fulfillment & Delivery
  {
    id: 'shopify_fulfillment',
    name: 'Shopify Fulfillment',
    description: 'Track orders and fulfillment in real-time',
    type: 'shipping',
    enabled: false,
    status: 'pending',
    icon: () => <Package size={24} color="#95BF47" />,
    requiresSetup: true,
    configured: false,
    partnerStatus: 'official',
  },
  {
    id: 'local_delivery',
    name: 'Local Delivery',
    description: 'Manage local delivery options and routing',
    type: 'shipping',
    enabled: false,
    status: 'pending',
    icon: () => <Truck size={24} color="#95BF47" />,
    requiresSetup: true,
    configured: false,
    partnerStatus: 'official',
  },

  // Analytics & Reporting
  {
    id: 'shopify_analytics',
    name: 'Shopify Analytics',
    description: 'Mobile app analytics and performance tracking',
    type: 'analytics',
    enabled: true,
    status: 'active',
    icon: () => <BarChart3 size={24} color="#95BF47" />,
    requiresSetup: false,
    configured: true,
    partnerStatus: 'official',
  },

  // Shipping & Fulfillment
  {
    id: 'shippo',
    name: 'Shippo',
    description: 'Automate your shipping with real-time rates and labels',
    type: 'shipping',
    enabled: false,
    status: 'pending',
    icon: () => <Truck size={24} color="#2CCCFF" />,
    requiresSetup: true,
    configured: false,
    partnerStatus: 'certified',
  },
  {
    id: 'easypost',
    name: 'EasyPost',
    description: 'Multi-carrier shipping solution with real-time tracking',
    type: 'shipping',
    enabled: false,
    status: 'pending',
    icon: () => <Package size={24} color="#00B4FF" />,
    requiresSetup: true,
    configured: false,
    partnerStatus: 'certified',
  },

  // Marketing & Communication
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing automation platform',
    type: 'marketing',
    enabled: true,
    status: 'active',
    icon: () => <Mail size={24} color="#FFE01B" />,
    requiresSetup: true,
    configured: true,
    popular: true,
    partnerStatus: 'official',
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    description: 'Marketing automation for email and SMS',
    type: 'marketing',
    enabled: false,
    status: 'pending',
    icon: () => <MessageSquare size={24} color="#25D366" />,
    requiresSetup: true,
    configured: false,
    popular: true,
    partnerStatus: 'official',
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: 'Push notifications and real-time updates',
    type: 'marketing',
    enabled: false,
    status: 'pending',
    icon: () => <Bell size={24} color="#FFA611" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },

  // Analytics & Tracking
  {
    id: 'google_analytics',
    name: 'Google Analytics',
    description: 'Track and report website traffic',
    type: 'analytics',
    enabled: true,
    status: 'active',
    icon: () => <BarChart3 size={24} color="#4285F4" />,
    requiresSetup: true,
    configured: true,
    popular: true,
    partnerStatus: 'official',
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    description: 'Advanced mobile app analytics and user tracking',
    type: 'analytics',
    enabled: false,
    status: 'pending',
    icon: () => <LineChart size={24} color="#FFA611" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'certified',
  },

  // CRM & Customer Support
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Customer support and ticket management',
    type: 'crm',
    enabled: false,
    status: 'pending',
    icon: () => <Headphones size={24} color="#FFA611" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    description: 'In-app customer messaging and support',
    type: 'crm',
    enabled: false,
    status: 'pending',
    icon: () => <MessageCircle size={24} color="#FFA611" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },

  // ERP & Inventory
  {
    id: 'netsuite',
    name: 'NetSuite',
    description: 'Enterprise resource planning and inventory management',
    type: 'erp',
    enabled: false,
    status: 'pending',
    icon: () => <Building2 size={24} color="#FFA611" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'certified',
  },
  {
    id: 'dear',
    name: 'DEAR Systems',
    description: 'Inventory and order management system',
    type: 'erp',
    enabled: false,
    status: 'pending',
    icon: () => <BoxesIcon size={24} color="#FFA611" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'certified',
  },

  // Marketplace Integrations
  {
    id: 'amazon',
    name: 'Amazon Marketplace',
    description: 'Sell your products on Amazon',
    type: 'marketplace',
    enabled: false,
    status: 'pending',
    icon: () => <ShoppingBag size={24} color="#FFA611" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'ebay',
    name: 'eBay Integration',
    description: 'List and sell products on eBay',
    type: 'marketplace',
    enabled: false,
    status: 'pending',
    icon: () => <Store size={24} color="#FFA611" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },

  // GHL (Go High Level) Integrations
  {
    id: 'ghl_crm',
    name: 'GHL CRM Sync',
    description: 'Sync customers, orders, and conversations with Go High Level CRM',
    type: 'crm',
    enabled: false,
    status: 'pending',
    icon: () => <Workflow size={24} color="#FF5722" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
    documentation: 'https://docs.gohighlevel.com/',
    ghlFeature: 'ghl_crm',
  },
  {
    id: 'ghl_automation',
    name: 'GHL Automation',
    description: 'Advanced marketing automation and customer journey workflows',
    type: 'automation',
    enabled: false,
    status: 'pending',
    icon: () => <Zap size={24} color="#FF5722" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'ghl_chatbot',
    name: 'AI Shopping Assistant',
    description: 'AI-powered chatbot for personalized shopping recommendations',
    type: 'crm',
    enabled: false,
    status: 'pending',
    icon: () => <Bot size={24} color="#FF5722" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },

  // Custom In-House Integrations
  {
    id: 'smart_qr',
    name: 'Smart QR System',
    description: 'Dynamic QR codes for products with real-time analytics',
    type: 'mobile',
    enabled: false,
    status: 'pending',
    icon: () => <QrCode size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'biometric_checkout',
    name: 'Biometric Checkout',
    description: 'Secure checkout with Face ID/Touch ID integration',
    type: 'payment',
    enabled: false,
    status: 'pending',
    icon: () => <Fingerprint size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    requiresPlus: true,
    partnerStatus: 'official',
  },
  {
    id: 'social_commerce',
    name: 'Social Commerce Hub',
    description: 'Integrate TikTok, Instagram, and Facebook shopping experiences',
    type: 'social',
    enabled: false,
    status: 'pending',
    icon: () => <Share2 size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'referral_system',
    name: 'Advanced Referrals',
    description: 'Multi-level referral system with gamification',
    type: 'marketing',
    enabled: false,
    status: 'pending',
    icon: () => <Users2 size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'subscription_manager',
    name: 'Subscription Manager',
    description: 'Advanced subscription management with flexible billing',
    type: 'payment',
    enabled: false,
    status: 'pending',
    icon: () => <Repeat size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    requiresPlus: true,
    partnerStatus: 'official',
  },
  {
    id: 'flash_deals',
    name: 'Flash Deals Engine',
    description: 'Time-sensitive deals with real-time inventory management',
    type: 'marketing',
    enabled: false,
    status: 'pending',
    icon: () => <ShoppingCart size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'theme_customizer',
    name: 'Advanced Theme Engine',
    description: 'Custom theme builder with real-time preview',
    type: 'customization',
    enabled: false,
    status: 'pending',
    icon: () => <Palette size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'layout_builder',
    name: 'Layout Builder Pro',
    description: 'Drag-and-drop layout builder for mobile app screens',
    type: 'customization',
    enabled: false,
    status: 'pending',
    icon: () => <Layout size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
  {
    id: 'ai_personalization',
    name: 'AI Personalization',
    description: 'AI-powered product recommendations and personalized experiences',
    type: 'customization',
    enabled: false,
    status: 'pending',
    icon: () => <Sparkles size={24} color="#6366F1" />,
    requiresSetup: true,
    configured: false,
    premium: true,
    partnerStatus: 'official',
  },
];

const initialState: IntegrationsState = {
  integrations: initialIntegrations,
};

function integrationsReducer(state: IntegrationsState, action: IntegrationsAction): IntegrationsState {
  switch (action.type) {
    case 'TOGGLE_INTEGRATION':
      return {
        ...state,
        integrations: state.integrations.map((integration) =>
          integration.id === action.payload.id ? { ...integration, enabled: !integration.enabled } : integration,
        ),
      };
    case 'UPDATE_STATUS':
      return {
        ...state,
        integrations: state.integrations.map((integration) =>
          integration.id === action.payload.id ? { ...integration, status: action.payload.status } : integration,
        ),
      };
    default:
      return state;
  }
}

interface IntegrationsContextValue {
  state: IntegrationsState;
  dispatch: React.Dispatch<IntegrationsAction>;
  ghlFeatures: typeof ghlFeatures;
}

const IntegrationsContext = createContext<IntegrationsContextValue | null>(null);

export function IntegrationsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(integrationsReducer, initialState);
  
  const value = {
    state,
    dispatch,
    ghlFeatures,
  };

  return <IntegrationsContext.Provider value={value}>{children}</IntegrationsContext.Provider>;
}

export function useIntegrations() {
  const context = useContext(IntegrationsContext);
  if (!context) {
    throw new Error('useIntegrations must be used within an IntegrationsProvider');
  }
  return context;
}
