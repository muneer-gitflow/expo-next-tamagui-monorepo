import { Card, BlockStack, Text, List } from '@shopify/polaris';

export function PublishingGuidelines() {
  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Publishing Guidelines</Text>
        <List>
          <List.Item>Complete all required information</List.Item>
          <List.Item>Provide high-quality screenshots</List.Item>
          <List.Item>Ensure app meets our quality standards</List.Item>
          <List.Item>Include detailed app description</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
} 