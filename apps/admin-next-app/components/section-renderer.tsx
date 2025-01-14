import { BlockStack, RadioButton, Select, Tabs } from '@shopify/polaris';
import { useState } from 'react';
import type { Field, GroupItem, ThemeSection } from '../stores/theme-store';
import FileUploader from './file-uploader';

const FieldRenderer = ({ field }: { field: Field }) => {
  switch (field.type) {
    case 'select':
      return <Select label={field.label} options={field.options || []} onChange={() => {}} value={field.value} />;
    case 'upload':
      return <FileUploader maxFiles={1} onFilesChange={() => {}} placeholder={'Upload Image'} />;
    case 'radio':
      return (
        <RadioButton
          label={field.label}
          helpText={field.hint}
          checked={field.value === 'disabled'}
          id={field.id}
          name={field.id}
          onChange={() => {}}
        />
      );
    default:
      return <div>{field.label}</div>;
  }
};

const GroupRenderer = ({ group }: { group: GroupItem }) => {
  return (
    <BlockStack gap="400">
      {group.fields.map((field) => (
        <FieldRenderer key={field.id} field={field} />
      ))}
    </BlockStack>
  );
};

export default function SectionTabRenderer({ config }: { config?: ThemeSection }) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const currentGroupItem = config?.groupItems?.[selectedTabIndex];

  return (
    <div>
      {config?.groupItems && config.groupItems.length > 0 && (
        <>
          <Tabs
            tabs={config.groupItems.map((item) => ({
              id: item.id,
              content: item.content,
              accessibilityLabel: item.label,
            }))}
            selected={selectedTabIndex}
            onSelect={setSelectedTabIndex}
          />

          <div style={{ marginTop: '16px' }}>
            {currentGroupItem ? <GroupRenderer group={currentGroupItem} /> : null}
          </div>
        </>
      )}
    </div>
  );
}
