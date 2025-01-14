import { Box } from '@shopify/polaris';
import { Home, Heart, ShoppingCart, Package2, User } from 'lucide-react';

interface FooterNavigationProps {
  activeTab?: 'home' | 'wishlist' | 'cart' | 'orders' | 'account';
}

export default function FooterNavigation({ activeTab = 'home' }: FooterNavigationProps) {
  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Heart, label: 'Wish List', id: 'wishlist' },
    { icon: ShoppingCart, label: 'Cart', id: 'cart' },
    { icon: Package2, label: 'My Orders', id: 'orders' },
    { icon: User, label: 'Account', id: 'account' },
  ];

  return (
    <Box>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '10px 0',
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {navItems.map(({ icon: Icon, label, id }) => (
          <div
            key={id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              opacity: activeTab === id ? 1 : 0.6,
            }}
          >
            <Icon color="white" width={20} height={20} />
            <span
              style={{
                color: 'white',
                fontSize: '12px',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </Box>
  );
}
