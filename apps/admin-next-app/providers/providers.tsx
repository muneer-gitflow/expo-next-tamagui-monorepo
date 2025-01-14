'use client';

import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import ApolloProvider from './ApolloProvider';
import { NavMenu } from '@shopify/app-bridge-react';
import { ReduxProvider } from './ReduxProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider i18n={translations}>
      <ApolloProvider>
        <ReduxProvider>
          <NavMenu>
            <a href="/" rel="home">
              Home
            </a>
            <a href="/templates">Templates</a>
            <a href="/settings">Settings</a>
          </NavMenu>

          {children}
        </ReduxProvider>
      </ApolloProvider>
    </AppProvider>
  );
}

export function ExitProvider({ children }: { children: React.ReactNode }) {
  return <AppProvider i18n={translations}>{children}</AppProvider>;
}
