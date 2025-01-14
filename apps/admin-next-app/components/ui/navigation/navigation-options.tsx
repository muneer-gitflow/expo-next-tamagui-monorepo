import { Box, InlineGrid, Button } from '@shopify/polaris';
import { MenuIcon, LayoutFooterIcon } from '@shopify/polaris-icons';

const NavigationOptions = [
  // {
  //   id: 'side-menu',
  //   name: 'Side menu',
  //   description: 'Manage your apps side menu navigation',
  //   icon: MenuIcon,
  //   type: 'side-menu',
  // },
  {
    id: 'bottom-bar',
    name: 'Bottom bar',
    description: 'Manage your apps bottom bar navigation',
    icon: LayoutFooterIcon,
    type: 'bottom-bar',
  },
];

export default function ThemeNavigationOptions() {
  return (
    <div
      style={{
        flex: '0 0 316px',
        borderLeft: '1px solid #ccc',
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 64px)',
        paddingBlock: '10px',
      }}
    >
      <Box paddingInline={'400'}>
        <InlineGrid gap={'200'}>
          {NavigationOptions.map((option) => (
            <Button textAlign="left" size="large" variant="tertiary" icon={option.icon} key={option.id}>
              {option.name}
            </Button>
          ))}
        </InlineGrid>
      </Box>
    </div>
  );
}
