import React, { useMemo, useState } from 'react';
import {
  Page,
  Layout,
  Card,
  IndexTable,
  Text,
  Badge,
  TextField,
  ButtonGroup,
  Button,
  Icon,
  EmptyState,
} from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { Link } from '@remix-run/react';

interface Segment {
  id: string;
  name: string;
  description: string;
  rules: string[];
  usersCount: number;
  createdAt: string;
  status: 'active' | 'draft';
}

export default function SegmentList() {
  const [searchValue, setSearchValue] = useState('');

  const segments: Segment[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Android Users',
        description: 'All users using Android devices',
        rules: ['Device Type: Android'],
        usersCount: 1200,
        createdAt: '2024-03-20T10:00:00Z',
        status: 'active',
      },
      {
        id: '2',
        name: 'Recent Installations',
        description: 'Users who installed the app in last 3 days',
        rules: ['Installation Date: Last 3 days'],
        usersCount: 450,
        createdAt: '2024-03-19T15:30:00Z',
        status: 'active',
      },
      {
        id: '3',
        name: 'Inactive iOS Users',
        description: 'iOS users who haven\'t opened app in 7 days',
        rules: ['Device Type: iOS', 'Last Active: > 7 days'],
        usersCount: 890,
        createdAt: '2024-03-18T09:00:00Z',
        status: 'draft',
      },
    ],
    [],
  );

  const filteredSegments = useMemo(() => {
    return segments.filter((segment) =>
      searchValue
        ? segment.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          segment.description.toLowerCase().includes(searchValue.toLowerCase())
        : true,
    );
  }, [segments, searchValue]);

  const resourceName = {
    singular: 'segment',
    plural: 'segments',
  };

  const emptyStateMarkup = (
    <EmptyState
      heading="Create segments to target specific users"
      action={{ content: 'Create segment', url: '/app/notification/segments/new' }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Create and manage segments to send targeted push notifications.</p>
    </EmptyState>
  );

  return (
    <Page
      title="Segments"
      primaryAction={
        <Button variant="primary" url="/app/notification/segments/new">
          Create segment
        </Button>
      }
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div style={{ padding: '16px' }}>
              <TextField
                label="Search segments"
                value={searchValue}
                onChange={setSearchValue}
                prefix={<Icon source={SearchIcon} />}
                placeholder="Search by name or description"
                autoComplete="off"
              />
            </div>

            {filteredSegments.length > 0 ? (
              <IndexTable
                resourceName={resourceName}
                itemCount={filteredSegments.length}
                headings={[
                  { title: 'Name' },
                  { title: 'Rules' },
                  { title: 'Users' },
                  { title: 'Status' },
                  { title: 'Created' },
                ]}
                selectable={false}
              >
                {filteredSegments.map(
                  ({ id, name, description, rules, usersCount, status, createdAt }, index) => (
                    <IndexTable.Row id={id} key={id} position={index}>
                      <IndexTable.Cell>
                        <Link to={`/app/notification/segments/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Text variant="bodyMd" fontWeight="bold" as="h3">
                            {name}
                          </Text>
                          <Text variant="bodySm" as="p" tone="subdued">
                            {description}
                          </Text>
                        </Link>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <ButtonGroup>
                          {rules.map((rule, i) => (
                            <Badge key={i}>{rule}</Badge>
                          ))}
                        </ButtonGroup>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="span" variant="bodyMd">
                          {usersCount.toLocaleString()}
                        </Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Badge tone={status === 'active' ? 'success' : undefined}>{status}</Badge>
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <Text as="span" variant="bodyMd">
                          {new Date(createdAt).toLocaleDateString()}
                        </Text>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  ),
                )}
              </IndexTable>
            ) : (
              emptyStateMarkup
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
