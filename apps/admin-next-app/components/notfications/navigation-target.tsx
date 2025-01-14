import React from 'react';
import { Card, Text, BlockStack, RadioButton, Box, Select } from '@shopify/polaris';

interface Product {
  id: string;
  title: string;
  image?: string;
}

export default function NavigationTarget() {
  const [selectedTarget, setSelectedTarget] = React.useState('product');
  const [selectedProduct, setSelectedProduct] = React.useState('');

  const options = [
    { label: 'Secret Water Royal Arab Air Freshener 320ML', value: '1' },
    { label: 'Secret Water Le Musk Freshener 320ML', value: '2' },
    { label: 'Mahasin Abaya Air freshener 320ml', value: '3' },
    { label: 'Mark Des Vince Aromatic Home Fragrance 500ML', value: '4' },
    { label: 'Mark Des Vince Fresh Home Fragrance 500ML', value: '5' },
  ];

  const handleTargetChange = (value: string) => {
    setSelectedTarget(value);
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">
          Navigate to
        </Text>

        <BlockStack gap="300">
          <RadioButton
            label="Screen"
            checked={selectedTarget === 'screen'}
            id="screen"
            name="navigate"
            onChange={() => handleTargetChange('screen')}
          />

          <RadioButton
            label="Product"
            checked={selectedTarget === 'product'}
            id="product"
            name="navigate"
            onChange={() => handleTargetChange('product')}
          />
          {selectedTarget === 'product' && (
            <Box paddingInlineStart="400">
              <Select
                label=""
                labelHidden
                options={options}
                onChange={setSelectedProduct}
                value={selectedProduct}
                placeholder="Select product"
              />
            </Box>
          )}

          <RadioButton
            label="Collection"
            checked={selectedTarget === 'collection'}
            id="collection"
            name="navigate"
            onChange={() => handleTargetChange('collection')}
          />

          <RadioButton
            label="External link"
            checked={selectedTarget === 'external_link'}
            id="external_link"
            name="navigate"
            onChange={() => handleTargetChange('external_link')}
          />
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
