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
  ButtonGroup,
  InlineStack,
} from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';

interface SegmentGroup {
  id: string;
  segments: string[];
  operator: 'AND' | 'OR';
}

interface SegmentResults {
  lastApplied: string;
  duration: string;
  totalContacts: number;
  contactsWithOptIn: number;
}

export default function CreateSegment() {
  const [name, setName] = useState('');
  const [includedGroups, setIncludedGroups] = useState<SegmentGroup[]>([{ id: '1', segments: [''], operator: 'AND' }]);
  const [excludedGroups, setExcludedGroups] = useState<SegmentGroup[]>([{ id: '1', segments: [''], operator: 'OR' }]);
  const [results, setResults] = useState<SegmentResults>({
    lastApplied: 'N/A',
    duration: 'N/A',
    totalContacts: 0,
    contactsWithOptIn: 0,
  });

  // Mock segments for dropdown
  const segmentOptions: {
    label: string;
    value: string;
  }[] = [
    { label: 'New segment 1', value: 'segment1' },
    { label: 'New segment 2', value: 'segment2' },
    { label: 'New segment 3', value: 'segment3' },
    { label: 'New segment 4', value: 'segment4' },
    { label: 'New segment 5', value: 'segment5' },
  ];

  const handleAddIncludedGroup = useCallback(() => {
    setIncludedGroups((prev) => [...prev, { id: String(Date.now()), segments: [''], operator: 'AND' }]);
  }, []);

  const handleAddExcludedGroup = useCallback(() => {
    setExcludedGroups((prev) => [...prev, { id: String(Date.now()), segments: [''], operator: 'OR' }]);
  }, []);

  const handleSegmentChange = useCallback(
    (groupId: string, index: number, value: string, type: 'included' | 'excluded') => {
      const setGroups = type === 'included' ? setIncludedGroups : setExcludedGroups;

      setGroups((prev) =>
        prev.map((group) => {
          if (group.id === groupId) {
            const newSegments = [...group.segments];
            newSegments[index] = value;
            return { ...group, segments: newSegments };
          }
          return group;
        }),
      );
    },
    [],
  );

  const handleOperatorChange = useCallback((groupId: string, value: 'AND' | 'OR', type: 'included' | 'excluded') => {
    const setGroups = type === 'included' ? setIncludedGroups : setExcludedGroups;

    setGroups((prev) => prev.map((group) => (group.id === groupId ? { ...group, operator: value } : group)));
  }, []);

  const handleRemoveGroup = useCallback(
    (groupId: string, type: 'included' | 'excluded') => {
      const setGroups = type === 'included' ? setIncludedGroups : setExcludedGroups;
      const groups = type === 'included' ? includedGroups : excludedGroups;

      if (groups.length > 1) {
        setGroups((prev) => prev.filter((group) => group.id !== groupId));
      }
    },
    [includedGroups, excludedGroups],
  );

  const handleRun = useCallback(() => {
    // Simulate API call
    setResults({
      lastApplied: new Date().toLocaleString(),
      duration: '2.3s',
      totalContacts: 1234,
      contactsWithOptIn: 987,
    });
  }, []);

  return (
    <Page title="Create combined segment">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Merge segments
              </Text>
              <TextField label="Combined segment name" value={name} onChange={setName} autoComplete="off" />
            </BlockStack>
          </Card>

          <Box paddingBlockStart="400">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Included segments
                </Text>
                {includedGroups.map((group) => (
                  <Box key={group.id} padding="400" borderBlockEndWidth="0165">
                    <BlockStack gap="400">
                      <InlineStack gap="200" align="start">
                        <Select
                          label=""
                          labelHidden
                          options={[
                            { label: 'AND', value: 'AND' },
                            { label: 'OR', value: 'OR' },
                          ]}
                          value={group.operator}
                          onChange={(value) => handleOperatorChange(group.id, value as 'AND' | 'OR', 'included')}
                        />
                        <Select
                          label=""
                          labelHidden
                          options={segmentOptions}
                          value={group.segments[0]}
                          onChange={(value) => handleSegmentChange(group.id, 0, value, 'included')}
                          placeholder="Select segment"
                        />
                        <Button
                          variant="tertiary"
                          tone="critical"
                          onClick={() => handleRemoveGroup(group.id, 'included')}
                        >
                          Remove
                        </Button>
                      </InlineStack>
                    </BlockStack>
                  </Box>
                ))}
                <Box padding="400">
                  <Button onClick={handleAddIncludedGroup} icon={PlusIcon}>
                    Add included segment
                  </Button>
                </Box>
              </BlockStack>
            </Card>
          </Box>

          <Box paddingBlockStart="400">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                  Excluded segments
                </Text>
                {excludedGroups.map((group) => (
                  <Box key={group.id} padding="400" borderBlockEndWidth="0165">
                    <BlockStack gap="400">
                      <InlineStack gap="200" align="start">
                        <Select
                          label=""
                          labelHidden
                          options={[
                            { label: 'OR', value: 'OR' },
                            { label: 'AND', value: 'AND' },
                          ]}
                          value={group.operator}
                          onChange={(value) => handleOperatorChange(group.id, value as 'AND' | 'OR', 'excluded')}
                        />
                        <Select
                          label=""
                          labelHidden
                          options={segmentOptions}
                          value={group.segments[0]}
                          onChange={(value) => handleSegmentChange(group.id, 0, value, 'excluded')}
                          placeholder="Select segment"
                        />
                        <Button
                          variant="tertiary"
                          tone="critical"
                          onClick={() => handleRemoveGroup(group.id, 'excluded')}
                        >
                          Remove
                        </Button>
                      </InlineStack>
                    </BlockStack>
                  </Box>
                ))}
                <Box padding="400">
                  <Button onClick={handleAddExcludedGroup} icon={PlusIcon}>
                    Add excluded segment
                  </Button>
                </Box>
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
                    Duration
                  </Text>
                  <Text as="p">{results.duration}</Text>
                </Box>
                <Box>
                  <Text as="p" fontWeight="bold">
                    Results
                  </Text>
                  <Text as="p">Total contacts: {results.totalContacts}</Text>
                  <Text as="p">Contacts with opt-in: {results.contactsWithOptIn}</Text>
                </Box>
                <Box paddingBlockStart="200">
                  <Button onClick={handleRun}>Run</Button>
                </Box>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
