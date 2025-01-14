import { useState } from 'react';
import FieldGroupRenderer from '../editor/field-group-renderer';
import type { UIBlock } from 'app/lib/store/types';

export default function FormBuilder<T>({ block }: { block: UIBlock }) {
  const { ui_block_fields } = block;

  // Initialize form values with default values from schema
  const [formValues, setFormValues] = useState(() => {
    const initialValues: Record<string, any> = {};
    ui_block_fields?.forEach((field: any) => {
      if (field.options?.default !== undefined) {
        initialValues[field.field_key] = field.options.default;
      } else if (field.type === 'array') {
        initialValues[field.field_key] = [];
      } else {
        initialValues[field.field_key] = '';
      }
    });
    return initialValues;
  });

  const handleChange = (fieldKey: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldKey]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Values:', formValues);
  };

  if (!ui_block_fields) return null;

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroupRenderer<T> fields={ui_block_fields} values={formValues} handleChange={handleChange} />
    </form>
  );
}
