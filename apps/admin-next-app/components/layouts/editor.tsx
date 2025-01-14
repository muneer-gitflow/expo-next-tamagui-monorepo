import { useState } from 'react';
import { Badge, Button, Box, InlineStack, InlineGrid, Text, Modal } from '@shopify/polaris';
import { ShopcodesIcon, ArrowUpIcon } from '@shopify/polaris-icons';
import { useSelector } from 'react-redux';
import type { RootState } from 'app/lib/store/store';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  const activeTheme = useSelector((state: RootState) => state.theme.activeTheme);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  return (
    <Box width="calc(100% - 100px)">
      <InlineGrid>
        <Box
          width="100%"
          borderColor="border-brand"
          padding="400"
          borderInlineStartWidth="0165"
          borderBlockEndWidth="0165"
          position="relative"
        >
          <InlineGrid alignItems="center" gap="200" columns={2}>
            <InlineStack gap="400" align="start">
              <Box width="160px" borderRadius="200" borderWidth="0165" padding={'100'} borderColor="border-brand">
                <InlineStack align="space-between">
                  <Text fontWeight="medium" variant="bodyMd" as="span">
                    {activeTheme?.title}
                  </Text>
                  <Badge>Draft</Badge>
                </InlineStack>
              </Box>
            </InlineStack>
            <InlineStack gap="400" align="end">
              <Button icon={ShopcodesIcon} variant="tertiary" onClick={() => setShowPreviewModal(true)}>
                Preview on mobile
              </Button>
              <Modal
                open={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                title="Test your theme on real device"
                primaryAction={{
                  content: 'Done',
                  onAction: () => setShowPreviewModal(false),
                }}
                secondaryActions={[
                  {
                    content: 'Install Gitspark Preview',
                    onAction: () => {
                      window.open('https://gitspark.app/preview', '_blank');
                    },
                  },
                ]}
              >
                <Modal.Section>
                  <div
                    style={{
                      maxWidth: '360px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: 'auto',
                      marginBottom: '20px',
                    }}
                  >
                    <Text as="p" alignment="center" variant="bodyMd">
                      Use your mobile device to scan this QR code or scan with preview app.
                    </Text>
                    <Text as="p" alignment="center" variant="bodyMd">
                      It serves as a unique key to access your store.
                    </Text>
                    <img width={'150'} src="/qrCode.png" alt="qrCode" />
                  </div>
                </Modal.Section>
                <Modal.Section>
                  <Text as="p" alignment="center" variant="bodyMd">
                    Need help?
                  </Text>
                  <Text as="p" alignment="center" variant="bodyMd">
                    Contact us at support@gitspark.app
                  </Text>
                </Modal.Section>
              </Modal>
              <Button variant="primary" disabled>
                Cancel
              </Button>
              <Button icon={ArrowUpIcon}>Upgrade to Publish</Button>
            </InlineStack>
          </InlineGrid>
        </Box>
        {children}
      </InlineGrid>
    </Box>
  );
}
