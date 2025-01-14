import { Box } from '@shopify/polaris';
import styles from './mobile-simulator.module.css';
import { useEffect, useState } from 'react';
import { DrawerContent } from '../ui/navigation/drawer-content';
import { DeviceStatusBar } from './device-status-bar';
import { DeviceFrame } from './device-frame';
import { DeviceScreen } from './device-screen';

export default function NavigationSimulator() {
  const [tailwindLoaded, setTailwindLoaded] = useState(false);

  useEffect(() => {
    const tailwindScriptId = 'tailwind-css';

    if (!document.getElementById(tailwindScriptId)) {
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      tailwindScript.id = tailwindScriptId;

      tailwindScript.onload = () => {
        setTailwindLoaded(true); // Set state when Tailwind is successfully loaded
      };

      tailwindScript.onerror = () => {
        console.error('Failed to load Tailwind CSS from CDN');
      };

      document.head.appendChild(tailwindScript);
    } else {
      setTailwindLoaded(true); // Tailwind already loaded
    }
  }, []);

  if (!tailwindLoaded) {
    return <div>Loading simulator styles...</div>;
  }

  return (
    <Box
      width="calc(100% - 316px - 316px)"
      borderInlineStartWidth="0165"
      borderColor="border-brand"
      background="bg"
      position="relative"
      overflowX="hidden"
      overflowY="hidden"
    >
      <div
        className={styles.simulatorScreenCenterFix}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DeviceFrame>
          <DeviceStatusBar />
          <DeviceScreen>
            <DrawerContent />
          </DeviceScreen>
        </DeviceFrame>
      </div>
    </Box>
  );
}
