import { Card, BlockStack, Box, Text, Button } from '@shopify/polaris';
import CollapsibleSection from './collapsibles';
import SectionRenderer from './section-renderer';
import { useState } from 'react';

const CustomizePanel = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [sections, setSections] = useState([]);

  return (
    <Card>
      <BlockStack gap="400">
        <Box padding="400">
          <BlockStack gap="400">
            <Button size="slim">{selectedLanguage}</Button>

            <Text variant="headingMd" as="h2">
              Configure Your Theme
            </Text>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button>Save</Button>
              <Button variant="primary">Save & Next</Button>
            </div>

            {sections.map((section: any) => (
              <CollapsibleSection key={section.id} title={section.title} id={section.id}>
                <SectionRenderer config={section} />
              </CollapsibleSection>
            ))}
          </BlockStack>
        </Box>
      </BlockStack>
    </Card>
  );
};

export default CustomizePanel;
