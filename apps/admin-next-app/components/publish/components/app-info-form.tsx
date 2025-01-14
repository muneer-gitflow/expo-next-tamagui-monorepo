import { FormLayout, TextField, Select, Box } from '@shopify/polaris';
import { usePublish } from '../context/PublishContext';

export function AppInfoForm() {
  const { state, dispatch } = usePublish();
  const { metadata } = state;

  const categories = [
    { label: 'Store Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Customer Support', value: 'support' },
    { label: 'Inventory', value: 'inventory' },
    { label: 'Shipping', value: 'shipping' },
  ];

  return (
    <Box padding="400">
      <FormLayout>
        <TextField
          label="App Name"
          value={metadata.name}
          onChange={(value) => dispatch({
            type: 'UPDATE_METADATA',
            payload: { name: value }
          })}
          helpText="Choose a unique and memorable name"
          autoComplete="off"
        />

        <TextField
          label="Short Description"
          value={metadata.shortDescription}
          onChange={(value) => dispatch({
            type: 'UPDATE_METADATA',
            payload: { shortDescription: value }
          })}
          maxLength={80}
          showCharacterCount
          multiline={2}
          autoComplete="off"
        />

        <TextField
          label="Full Description"
          value={metadata.fullDescription}
          onChange={(value) => dispatch({
            type: 'UPDATE_METADATA',
            payload: { fullDescription: value }
          })}
          maxLength={4000}
          showCharacterCount
          multiline={4}
          autoComplete="off"
        />

        <Select
          label="Category"
          options={categories}
          value={metadata.category}
          onChange={(value) => dispatch({
            type: 'UPDATE_METADATA',
            payload: { category: value }
          })}
        />

        <TextField
          label="Support Email"
          type="email"
          value={metadata.supportEmail}
          onChange={(value) => dispatch({
            type: 'UPDATE_METADATA',
            payload: { supportEmail: value }
          })}
          autoComplete="off"
        />

        <TextField
          label="Website"
          type="url"
          value={metadata.website}
          onChange={(value) => dispatch({
            type: 'UPDATE_METADATA',
            payload: { website: value }
          })}
          autoComplete="off"
        />
      </FormLayout>
    </Box>
  );
}
