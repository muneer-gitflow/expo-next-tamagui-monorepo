import {
  Home,
  Sparkles,
  Heart,
  ShoppingBag,
  Gift,
  Settings,
  User,
  Crown,
  Leaf,
  Flower,
  Droplet,
  Star,
  LogOut,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useState } from 'react';
import { Button, PlaceholderImage } from '../@shadcn';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  subItems?: { label: string; icon?: React.ReactNode }[];
}

export function DrawerContent() {
  const [currentMenu, setCurrentMenu] = useState<'main' | 'sub' | string>('main');
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem | null>(null);

  const menuItems: MenuItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Home',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      label: 'Collections',
      subItems: [
        { label: 'New Arrivals', icon: <Star className="h-5 w-5" /> },
        { label: 'Best Sellers', icon: <Crown className="h-5 w-5" /> },
        { label: 'Limited Edition', icon: <Sparkles className="h-5 w-5" /> },
      ],
    },
    {
      icon: <Droplet className="h-5 w-5" />,
      label: 'Categories',
      subItems: [
        { label: 'Floral', icon: <Flower className="h-5 w-5" /> },
        { label: 'Woody', icon: <Leaf className="h-5 w-5" /> },
        { label: 'Oriental' },
        { label: 'Fresh' },
        { label: 'Citrus' },
      ],
    },
    {
      icon: <Gift className="h-5 w-5" />,
      label: 'Gift Sets',
      subItems: [{ label: 'For Her' }, { label: 'For Him' }, { label: 'Luxury Sets' }, { label: 'Travel Sets' }],
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: 'Wishlist',
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: 'My Orders',
      subItems: [{ label: 'Active Orders' }, { label: 'Order History' }, { label: 'Saved Items' }],
    },
    {
      icon: <User className="h-5 w-5" />,
      label: 'Profile',
      subItems: [{ label: 'Personal Info' }, { label: 'Addresses' }, { label: 'Payment Methods' }],
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      subItems: [{ label: 'Notifications' }, { label: 'Privacy' }, { label: 'Help & Support' }],
    },
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      setActiveMenuItem(item);
      setCurrentMenu('sub');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white">
      {/* Profile Section */}
      <div className="sticky top-0 bg-[#1A1A1A] border-b border-white/10 px-2 py-6 z-10 border-radius-lg">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-[#4CAF50]/20 bg-[#1E1E1E]">
            <PlaceholderImage width={56} height={56} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Welcome Back</h2>
            <p className="text-sm text-gray-400">Discover your signature scent</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-2 py-2 bg-[#121212]">
        {currentMenu === 'main' ? (
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  'w-full justify-between gap-4 rounded-lg px-3 py-6 font-normal',
                  'text-gray-300 hover:text-[#4CAF50] hover:bg-[#1E1E1E]',
                  'transition-colors duration-200',
                )}
                onClick={() => handleMenuClick(item)}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  {item.label}
                </div>
                {item.subItems && <ChevronRight className="h-5 w-5 opacity-60" />}
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-300 hover:text-white hover:bg-[#1E1E1E]"
                onClick={() => setCurrentMenu('main')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="font-semibold text-white">{activeMenuItem?.label}</span>
            </div>
            {activeMenuItem?.subItems?.map((subItem) => (
              <Button
                key={subItem.label}
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-4 rounded-lg px-3 py-6 font-normal',
                  'text-gray-300 hover:text-[#4CAF50] hover:bg-[#1E1E1E]',
                  'transition-colors duration-200',
                )}
              >
                {subItem.icon}
                {subItem.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Logout Section */}
      <div className="sticky bottom-0 bg-[#1A1A1A] border-t border-white/10 p-4 z-10">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-4 rounded-lg px-3 py-6 font-normal',
            'bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300',
            'transition-colors duration-200',
          )}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
