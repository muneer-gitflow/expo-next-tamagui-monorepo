import { Box, Card, Text, List, Banner, ButtonGroup, Button, InlineStack, Thumbnail, Divider } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';

export function ReviewSubmit() {
  const { state } = usePublish();
  const { metadata, media, wizard } = state;

  const sections = [
    {
      title: 'Publishing Method',
      items: [
        { label: 'Method', value: wizard.path === 'our-account' ? 'Through our account' : 'Through your account' },
        { label: 'Launch Type', value: wizard.launchType === 'beta' ? 'Beta Launch' : 'Production Launch' },
        { label: 'Target Stores', value: wizard.storeType === 'both' ? 'App Store & Play Store' : wizard.storeType },
      ],
    },
    {
      title: 'App Information',
      items: [
        { label: 'App Name', value: metadata.name },
        { label: 'Category', value: metadata.category },
        { label: 'Short Description', value: metadata.shortDescription },
        { label: 'Support Email', value: metadata.supportEmail },
        { label: 'Website', value: metadata.website },
      ],
    },
    // {
    //   title: 'Pricing',
    //   items: [
    //     {
    //       label: 'Model',
    //       value: metadata.price === 'free' ? 'Free' : metadata.price === 'freemium' ? 'Freemium' : 'Paid',
    //     },
    //     ...(metadata.price !== 'free' ? [{ label: 'Price', value: `$${metadata.price}` }] : []),
    //   ],
    // },
  ];

  return (
    <Box padding="400">
      <Banner tone="warning">
        Please review all information carefully before submitting. Changes after submission may delay the review
        process.
      </Banner>

      <Box paddingBlockStart="400">
        {sections.map((section, index) => (
          <Box key={section.title} paddingBlockEnd={index < sections.length - 1 ? '400' : '0'}>
            <Card>
              <Box padding="400">
                <Text as="h2" variant="headingMd">
                  {section.title}
                </Text>
                <Box paddingBlockStart="400">
                  <List type="bullet">
                    {section.items.map((item) => (
                      <List.Item key={item.label}>
                        <InlineStack gap="400">
                          <Text as="span" fontWeight="bold">
                            {item.label}:
                          </Text>
                          <Text as="span">{item.value}</Text>
                        </InlineStack>
                      </List.Item>
                    ))}
                  </List>
                </Box>
              </Box>
            </Card>
          </Box>
        ))}

        <Box paddingBlockStart="400">
          <Card>
            <Box padding="400">
              <Text as="h2" variant="headingMd">
                Media Assets
              </Text>
              <Box paddingBlockStart="400">
                <InlineStack gap="400" wrap={false}>
                  {media.icon && (
                    <Box>
                      <Text as="p" variant="bodySm">
                        App Icon
                      </Text>
                      <Box paddingBlockStart="200">
                        <Thumbnail source={URL.createObjectURL(media.icon)} alt="App icon" />
                      </Box>
                    </Box>
                  )}
                  <Divider />
                  <Box>
                    <Text as="p" variant="bodySm">
                      Screenshots ({media.screenshots.length})
                    </Text>
                    <Box paddingBlockStart="200">
                      <InlineStack gap="200">
                        {media.screenshots.map((screenshot, index) => (
                          <Thumbnail
                            key={index}
                            source={URL.createObjectURL(screenshot)}
                            alt={`Screenshot ${index + 1}`}
                          />
                        ))}
                      </InlineStack>
                    </Box>
                  </Box>
                </InlineStack>
              </Box>
            </Box>
          </Card>
        </Box>

        <Box paddingBlockStart="400">
          <Card>
            <Box padding="400">
              <Text as="h2" variant="headingMd">
                Submission Checklist
              </Text>
              <Box paddingBlockStart="400">
                <List type="bullet">
                  <List.Item>All required information is provided</List.Item>
                  <List.Item>App icon and screenshots meet requirements</List.Item>
                  <List.Item>Content and pricing information is accurate</List.Item>
                  <List.Item>Privacy policy and terms of service are up to date</List.Item>
                </List>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
