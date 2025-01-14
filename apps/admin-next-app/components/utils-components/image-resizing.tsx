import { Button, Text, InlineGrid, Grid } from '@shopify/polaris';
import { BlankFilledIcon, MinimizeIcon, MaximizeIcon } from '@shopify/polaris-icons';

const ResizingOptions = ['fill', 'fit', 'stretch'] as const;

interface ImageResizingProps {
  handleChange: (value: 'fill' | 'fit' | 'stretch') => void;
  label: string;
  selectedValue: 'fill' | 'fit' | 'stretch';
}

const ImageResizeIcon = {
  fill: BlankFilledIcon,
  fit: MinimizeIcon,
  stretch: MaximizeIcon,
};

export default function ImageResizing({ handleChange, label, selectedValue }: ImageResizingProps) {
  return (
    <InlineGrid gap={'100'}>
      <div style={{ paddingBottom: '10px' }}>
        <Text as="span" variant="bodyMd">
          {label}
        </Text>
      </div>
      <div
        style={{
          padding: '5px',
          background: '#F5F4F4',
          borderRadius: '7px',
          width: '100%',
          display: 'flex',
        }}
      >
        {ResizingOptions.map((option) => (
          <button
            style={{
              width: 'calc(100% / 3)',
              height: '32px',
              border: 'none',
              borderRadius: '7px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: option === selectedValue ? '#fff' : 'transparent',
            }}
            className={option === selectedValue ? 'active' : ''}
            onClick={() => {
              handleChange(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </InlineGrid>
  );
}
