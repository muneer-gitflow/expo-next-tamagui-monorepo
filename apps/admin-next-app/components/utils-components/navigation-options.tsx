import { InlineGrid, Text, RadioButton } from '@shopify/polaris';

interface NavigationOptionsProps {
  handleChange: (value: any) => void;
}

export default function NavigationOptions({ handleChange }: NavigationOptionsProps) {
  return (
    <InlineGrid gap={'100'}>
      <Text as="span" variant="bodySm">
        Navigate to
      </Text>
      <RadioButton label="None" name="navigateTo" onChange={handleChange} />
      <RadioButton label="Screen" name="navigateTo" onChange={handleChange} />
      <RadioButton label="Product" name="navigateTo" onChange={handleChange} />
      <RadioButton label="Collection" name="navigateTo" onChange={handleChange} />
      <RadioButton label="External link" name="navigateTo" onChange={handleChange} />
    </InlineGrid>
  );
}
