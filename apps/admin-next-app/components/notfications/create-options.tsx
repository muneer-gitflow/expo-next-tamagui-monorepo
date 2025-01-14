import { Page, Box, Card, Text, BlockStack, InlineStack, Icon } from '@shopify/polaris';
import {
  ArrowRightIcon,
  NotificationIcon,
  GiftCardIcon,
  CartIcon,
  MinusCircleIcon,
  PersonSegmentIcon,
} from '@shopify/polaris-icons';
import { Link } from '@remix-run/react';

export default function CreateNotificationOptions() {
  const notificationTypes = [
    {
      section: 'Manual',
      items: [
        {
          id: 'new',
          title: 'New',
          description: 'Create personalized notifications from scratch and send them out as needed.',
          icon: NotificationIcon,
        },
      ],
    },
    {
      section: 'Automated',
      items: [
        {
          id: 'welcome',
          title: 'Welcome offer',
          description: 'Send engaging messages to new customers when they first sign up.',
          icon: GiftCardIcon,
        },
        {
          id: 'abandoned-cart',
          title: 'Abandoned cart',
          description: 'Increase potential sales by reminding customers of their abandoned carts.',
          icon: CartIcon,
        },
        {
          id: 'inactive-user',
          title: 'Inactive user',
          description: "Re-engage your customers who haven't used app in a long time.",
          icon: MinusCircleIcon,
        },
        {
          id: 'custom',
          title: 'Custom notification',
          description: 'Automatically send a customized message using created targeted segments.',
          icon: PersonSegmentIcon,
        },
      ],
    },
  ];

  return (
    <Page
      backAction={{
        content: 'Push notifications',
        url: '/app/notification',
      }}
      title="Create push notification"
    >
      <BlockStack gap="500">
        {notificationTypes.map((section) => (
          <Box key={section.section}>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                {section.section} {section.section === 'Automated' && '👑'}
              </Text>
              <BlockStack gap="300">
                {section.items.map((item) => (
                  <Card key={item.id} padding="400">
                    <Link
                      to={`/app/notification/create/${item.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <InlineStack gap="400" align="start" blockAlign="center">
                        <Box>
                          <Icon source={item.icon} />
                        </Box>
                        <BlockStack gap="200">
                          <Text as="h3" variant="headingMd">
                            {item.title}
                          </Text>
                          <Text as="p" variant="bodyMd" tone="text-inverse-secondary">
                            {item.description}
                          </Text>
                        </BlockStack>
                        <div style={{ marginLeft: 'auto' }}>
                          <Icon source={ArrowRightIcon} />
                        </div>
                      </InlineStack>
                    </Link>
                  </Card>
                ))}
              </BlockStack>
            </BlockStack>
          </Box>
        ))}
      </BlockStack>
    </Page>
  );
}
