import { Button, Text, InlineGrid, Grid } from '@shopify/polaris';

const RatioOptions = ['1:1', '2:3', '3:4'] as const;

interface ImageRatioSelectorProps {
  handleChange: (value: '1:1' | '2:3' | '3:4') => void;
  label: string;
  selectedValue: '1:1' | '2:3' | '3:4';
}

export default function ImageRatioSelector({ handleChange, label, selectedValue }: ImageRatioSelectorProps) {
  return (
    <InlineGrid gap={'100'}>
      <div style={{ paddingBottom: '10px' }}>
        <Text as="span" variant="bodyMd">
          {label}
        </Text>
      </div>

      <Grid columns={{ md: 3, sm: 1, lg: 3 }}>
        {RatioOptions.map((option) => (
          <Grid.Cell key={option}>
            <Button fullWidth pressed={option === selectedValue} onClick={() => handleChange(option)}>
              {option}
            </Button>
          </Grid.Cell>
        ))}
      </Grid>
    </InlineGrid>
  );
}
