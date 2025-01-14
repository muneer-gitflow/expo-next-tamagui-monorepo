import { type Field } from 'app/lib/store/types';
import FieldRenderer from './field-renderer';

export default function FieldGroupRenderer<T>({
  fields,
  values,
  handleChange,
}: {
  fields: Field<T>[];
  values: Record<string, any>;
  handleChange: (fieldKey: string, value: any) => void;
}) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
      {fields?.map((field) => (
        <FieldRenderer
          key={field.interface}
          field={field}
          value={values[field.field_key]}
          handleChange={(value) => handleChange(field.field_key, value)}
        />
      ))}
    </div>
  );
}
