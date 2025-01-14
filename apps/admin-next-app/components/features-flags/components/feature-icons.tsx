import type { FeatureId } from '../context/FeaturesContext';
import {
  LogIn,
  Bell,
  BarChart3,
  Wifi,
  Trophy,
  Share2,
  Moon,
  Languages,
  CreditCard,
  Heart,
  MessageSquare,
  View,
  Scan,
  MapPin,
  Package,
  Ruler,
  Camera,
  MessageCircle,
  Truck,
  ShoppingCart,
  Apple,
  Cog,
  Building2,
  Users,
} from 'lucide-react';

const FEATURE_ICONS: Record<FeatureId, React.FC> = {
  google_auth: () => <LogIn size={24} color="#4285F4" />,
  push_notifications: () => <Bell size={24} color="#FF9800" />,
  analytics: () => <BarChart3 size={24} color="#0066FF" />,
  offline_mode: () => <Wifi size={24} color="#4CAF50" />,
  loyalty_rewards: () => <Trophy size={24} color="#FFB400" />,
  social_sharing: () => <Share2 size={24} color="#2196F3" />,
  dark_mode: () => <Moon size={24} color="#673AB7" />,
  multi_language: () => <Languages size={24} color="#00BCD4" />,
  payment_options: () => <CreditCard size={24} color="#F44336" />,
  wishlists: () => <Heart size={24} color="#E91E63" />,
  reviews: () => <MessageSquare size={24} color="#9C27B0" />,
  apple_auth: () => <Apple size={24} color="#000000" />,
  ar_product_view: () => <View size={24} color="#9C27B0" />,
  scan_to_buy: () => <Scan size={24} color="#607D8B" />,
  store_locator: () => <MapPin size={24} color="#FF5722" />,
  inventory_check: () => <Package size={24} color="#795548" />,
  size_guide: () => <Ruler size={24} color="#3F51B5" />,
  virtual_try_on: () => <Camera size={24} color="#E91E63" />,
  in_app_chat: () => <MessageCircle size={24} color="#00BCD4" />,
  order_tracking: () => <Truck size={24} color="#8BC34A" />,
  abandoned_cart: () => <ShoppingCart size={24} color="#FF9800" />,
  custom_payment_gateway: () => <CreditCard size={24} color="#673AB7" />,
  custom_loyalty_program: () => <Trophy size={24} color="#FF5722" />,
  custom_analytics: () => <BarChart3 size={24} color="#2196F3" />,
  custom_erp: () => <Building2 size={24} color="#795548" />,
  custom_crm: () => <Users size={24} color="#009688" />,
};

interface FeatureIconProps {
  featureId: FeatureId;
  size?: 'small' | 'medium' | 'large';
}

export function FeatureIcon({ featureId, size = 'medium' }: FeatureIconProps) {
  const IconComponent = FEATURE_ICONS[featureId];
  return IconComponent ? <IconComponent /> : null;
}
