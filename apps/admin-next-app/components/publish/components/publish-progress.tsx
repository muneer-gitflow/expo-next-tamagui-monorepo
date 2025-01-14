import { usePublish } from '../context/PublishContext';
import { Card, BlockStack, Text, ProgressBar, List, Banner } from '@shopify/polaris';

export function PublishProgress() {
  const { state } = usePublish();
  const { publishStatus } = state;

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">
          Publishing Status
        </Text>

        {publishStatus.status === 'not_started' ? (
          <Banner tone="info">Complete the publishing wizard to submit your app</Banner>
        ) : (
          <>
            <BlockStack gap="400">
              {publishStatus.progress.ios && (
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">
                    App Store Status
                  </Text>
                  <ProgressBar progress={publishStatus.progress.ios.progress} size="small" />
                  <Text as="p">{publishStatus.progress.ios.message}</Text>
                </BlockStack>
              )}

              {publishStatus.progress.android && (
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">
                    Play Store Status
                  </Text>
                  <ProgressBar progress={publishStatus.progress.android.progress} size="small" />
                  <Text as="p">{publishStatus.progress.android.message}</Text>
                </BlockStack>
              )}
            </BlockStack>

            <BlockStack gap="200">
              <Text as="h3" variant="headingSm">
                Timeline
              </Text>
              <List>
                {publishStatus.timeline.map((event) => (
                  <List.Item key={event.date.toString()}>
                    {new Date(event.date).toLocaleDateString()}: {event.event}
                    {event.details && (
                      <Text as="p" tone="subdued">
                        {event.details}
                      </Text>
                    )}
                  </List.Item>
                ))}
              </List>
            </BlockStack>
          </>
        )}
      </BlockStack>
    </Card>
  );
}
