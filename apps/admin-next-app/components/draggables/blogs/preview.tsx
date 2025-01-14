import { Box, Text, InlineGrid, InlineStack, Badge, Icon } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';

export default function BlogsPreview() {
  return (
    <>
      <InlineGrid gap={'200'}>
        <Box borderWidth="0165" borderColor="border-brand" padding={'200'} borderRadius="100">
          <InlineGrid gap={'200'}>
            <Text fontWeight="bold" variant="bodyMd" as="span" alignment="center">
              Blog Title
            </Text>
            <Text variant="bodyXs" as="span" alignment="center">
              A brief overview of the posts or articles to entice users to read more.
            </Text>
            <InlineGrid gap={'200'}>
              <Box background="bg" padding={'200'} paddingInlineStart={'400'} paddingInlineEnd={'400'}>
                <InlineStack align="space-between">
                  <Text fontWeight="medium" variant="bodyMd" as="span">
                    Banner Image
                  </Text>
                  <Text alignment="end" as="span">
                    <Icon source={ArrowRightIcon} tone="base" />
                  </Text>
                </InlineStack>
              </Box>
              <Box background="bg" padding={'200'} paddingInlineStart={'400'} paddingInlineEnd={'400'}>
                <InlineStack align="space-between">
                  <Text fontWeight="medium" variant="bodyMd" as="span">
                    Banner Image
                  </Text>
                  <Text alignment="end" as="span">
                    <Icon source={ArrowRightIcon} tone="base" />
                  </Text>
                </InlineStack>
              </Box>
              <Box background="bg" padding={'200'} paddingInlineStart={'400'} paddingInlineEnd={'400'}>
                <InlineStack align="space-between">
                  <Text fontWeight="medium" variant="bodyMd" as="span">
                    Banner Image
                  </Text>
                  <Text alignment="end" as="span">
                    <Icon source={ArrowRightIcon} tone="base" />
                  </Text>
                </InlineStack>
              </Box>
            </InlineGrid>
          </InlineGrid>
        </Box>
        <InlineStack align="space-between">
          <Text fontWeight="medium" variant="bodyMd" as="span">
            Blog post
          </Text>
          <Badge tone="info">Advanced</Badge>
        </InlineStack>
      </InlineGrid>
    </>
  );
}
