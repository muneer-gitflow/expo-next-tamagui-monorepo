import React, { useCallback, useState } from 'react';
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Button,
  BlockStack,
  Box,
  Text,
  InlineStack,
  ButtonGroup,
} from '@shopify/polaris';
import { PlusIcon, DeleteIcon } from '@shopify/polaris-icons';

interface Rule {
  id: string;
  type: string;
  condition: string;
  value: string;
}

interface SegmentResults {
  lastApplied: string;
  count: string;
}

export default function CreateSegment() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [template, setTemplate] = useState('sms');
  const [rules, setRules] = useState<Rule[]>([{ id: '1', type: '', condition: '', value: '' }]);
  const [results, setResults] = useState<SegmentResults>({
    lastApplied: 'N/A',
    count: 'N/A',
  });

  const ruleTypes = [
    { label: 'Device Type', value: 'device_type' },
    { label: 'Installation Date', value: 'install_date' },
    { label: 'Last Active', value: 'last_active' },
    { label: 'App Version', value: 'app_version' },
    { label: 'Country', value: 'country' },
    { label: 'Language', value: 'language' },
  ];

  const conditionOptions = {
    device_type: [
      { label: 'is', value: 'is' },
      { label: 'is not', value: 'is_not' },
    ],
    install_date: [
      { label: 'less than', value: 'lt' },
      { label: 'greater than', value: 'gt' },
      { label: 'equals', value: 'eq' },
    ],
    last_active: [
      { label: 'less than', value: 'lt' },
      { label: 'greater than', value: 'gt' },
      { label: 'equals', value: 'eq' },
    ],
    app_version: [
      { label: 'equals', value: 'eq' },
      { label: 'greater than', value: 'gt' },
      { label: 'less than', value: 'lt' },
    ],
    country: [
      { label: 'is', value: 'is' },
      { label: 'is not', value: 'is_not' },
    ],
    language: [
      { label: 'is', value: 'is' },
      { label: 'is not', value: 'is_not' },
    ],
  };

  const handleRuleChange = useCallback((id: string, field: keyof Rule, value: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              [field]: value,
              ...(field === 'type' && { condition: '', value: '' }),
              ...(field === 'condition' && { value: '' }),
            }
          : rule,
      ),
    );
  }, []);

  const handleAddRule = useCallback(() => {
    setRules((prev) => [...prev, { id: String(Date.now()), type: '', condition: '', value: '' }]);
  }, []);

  const handleRemoveRule = useCallback((id: string) => {
    setRules((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((rule) => rule.id !== id);
    });
  }, []);

  const handleSaveAndApply = useCallback(() => {
    // Simulate API call
    setResults({
      lastApplied: new Date().toLocaleString(),
      count: '1,234',
    });
  }, []);

  return (
    <Page title="SMS Segmentation">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Segment Details
              </Text>
              <FormLayout>
                <TextField
                  label="Name"
                  value={name}
                  onChange={setName}
                  autoComplete="off"
                  placeholder="e.g., Active Android Users"
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={setDescription}
                  autoComplete="off"
                  multiline={3}
                  placeholder="Describe who this segment targets"
                />
                <Select
                  label="Template"
                  options={[{ label: 'SMS', value: 'sms' }]}
                  value={template}
                  onChange={setTemplate}
                />
              </FormLayout>
            </BlockStack>
          </Card>

          <Box paddingBlockStart="400">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  SMS:
                </Text>
                <Text as="p" tone="subdued">
                  You can further narrow down your segment by adding conditions. All conditions are grouped with the AND
                  operator.
                </Text>

                <BlockStack gap="300">
                  {rules.map((rule, index) => (
                    <InlineStack key={rule.id} gap="200" align="start" wrap={false}>
                      <Select
                        label=""
                        labelHidden
                        options={ruleTypes}
                        value={rule.type}
                        onChange={(value) => handleRuleChange(rule.id, 'type', value)}
                        placeholder="Select type"
                      />
                      <Select
                        label=""
                        labelHidden
                        options={rule.type ? conditionOptions[rule.type as keyof typeof conditionOptions] : []}
                        value={rule.condition}
                        onChange={(value) => handleRuleChange(rule.id, 'condition', value)}
                        disabled={!rule.type}
                        placeholder="Select condition"
                      />
                      <TextField
                        label=""
                        labelHidden
                        value={rule.value}
                        onChange={(value) => handleRuleChange(rule.id, 'value', value)}
                        disabled={!rule.condition}
                        autoComplete="off"
                        placeholder="Enter value"
                      />
                      <ButtonGroup>
                        {rules.length > 1 && (
                          <Button
                            icon={DeleteIcon}
                            variant="tertiary"
                            tone="critical"
                            onClick={() => handleRemoveRule(rule.id)}
                          />
                        )}
                        {index === rules.length - 1 && (
                          <Button
                            icon={PlusIcon}
                            variant="tertiary"
                            onClick={handleAddRule}
                          />
                        )}
                      </ButtonGroup>
                    </InlineStack>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>
          </Box>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Segment Results
              </Text>
              <BlockStack gap="200">
                <Box>
                  <Text as="p" fontWeight="bold">
                    Last applied
                  </Text>
                  <Text as="p">{results.lastApplied}</Text>
                </Box>
                <Box>
                  <Text as="p" fontWeight="bold">
                    Count
                  </Text>
                  <Text as="p">{results.count}</Text>
                </Box>
                <Box paddingBlockStart="200">
                  <Button onClick={handleSaveAndApply}>Save & Apply</Button>
                </Box>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
