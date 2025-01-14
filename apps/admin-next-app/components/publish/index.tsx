import React from 'react';
import { Page, Layout, BlockStack } from '@shopify/polaris';
import { PublishProvider } from './context/PublishContext';
import { PublishWizard } from './components/publish-wizard';
import { PublishProgress } from './components/publish-progress';
import { PublishingGuidelines } from './components/publishing-guidelines';

export default function PublishApp() {
  return (
    <PublishProvider>
      <Page title="Publish Your App" backAction={{ content: 'Apps', url: '/app/apps' }}>
        <Layout>
          <Layout.Section>
            <PublishWizard />
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="400">
              <PublishProgress />
              <PublishingGuidelines />
            </BlockStack>
          </Layout.Section>
        </Layout>
      </Page>
    </PublishProvider>
  );
}
