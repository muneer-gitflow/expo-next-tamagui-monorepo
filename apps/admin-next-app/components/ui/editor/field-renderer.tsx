import { RadioButton, TextField } from '@shopify/polaris';
import { type Field } from 'app/lib/store/types';
import { useMemo } from 'react';
import Gallery from '@/components/utils-components/gallery';
import NavigationOptions from '@/components/utils-components/navigation-options';
import ImageResizing from '@/components/utils-components/image-resizing';

interface FieldProps<T> {
  field: Field<T>;
  value: any;
  handleChange: (value: any) => void;
}

export default function FieldRenderer<T>({ field, value, handleChange }: FieldProps<T>) {
  const fieldContent = useMemo(() => {
    switch (field.interface) {
      case 'Gallery':
        return <Gallery handleChange={handleChange} />;

      case 'Checkbox':
        return <RadioButton label={field?.display_name || ''} name={field?.field_key || ''} onChange={handleChange} />;

      case 'Input':
        return (
          <TextField
            label={field?.display_name || ''}
            maxLength={20}
            autoComplete="off"
            showCharacterCount
            // value={value || String(field?.options?.default)}
            value="200"
            onChange={(e) => handleChange(e)}
          />
        );

      case 'Nav_Options':
        return <NavigationOptions handleChange={handleChange} />;

      case 'Resize_Options':
        return <ImageResizing handleChange={handleChange} label="Image resizing" options={field?.options as any} />;

      default:
        return <span>Unsupported field type: {field.interface}</span>;
    }
  }, [field, handleChange]);

  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{fieldContent}</label>
    </div>
  );
}
