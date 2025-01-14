import { Card, Box, Text, Button, BlockStack } from '@shopify/polaris';
import { CircleChevronDownIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

const CollapsibleSection = ({ title, children, id }: { title: string; children?: React.ReactNode; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card>
      <Box padding="400">
        <BlockStack gap="400">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={toggleSection}
          >
            <Text variant="headingMd" as="h3">
              {title}
            </Text>
            <Button icon={CircleChevronDownIcon} variant="plain" accessibilityLabel={isOpen ? 'Collapse' : 'Expand'} />
          </div>
          {isOpen ? children : null}
        </BlockStack>
      </Box>
    </Card>
  );
};

export default CollapsibleSection;
