import React, { useState, useCallback, useMemo } from 'react';
import {
  Page,
  Layout,
  LegacyCard,
  Tabs,
  TextField,
  Button,
  ButtonGroup,
  Select,
  Icon,
  IndexTable,
  Text,
  Badge,
  Thumbnail,
} from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { Link } from '@remix-run/react';

interface Notification {
  id: string;
  title: string;
  message: string;
  status: 'active' | 'scheduled' | 'inactive';
  type: 'manual' | 'automated';
  createdAt: string;
  image?: string;
  clicks: number;
  delivered: number;
}

export default function NotificationsList() {
  const [selected, setSelected] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('newest');
  const [statusValue, setStatusValue] = useState('all');

  const tabs = useMemo(
    () => [
      {
        id: 'manual',
        content: 'Manual',
        accessibilityLabel: 'Manual notifications',
        panelID: 'manual-panel',
      },
      {
        id: 'automated',
        content: 'Automated',
        accessibilityLabel: 'Automated notifications',
        panelID: 'automated-panel',
      },
    ],
    [],
  );

  const sortOptions = [
    { label: 'Newest created', value: 'newest' },
    { label: 'Oldest created', value: 'oldest' },
  ];

  const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Inactive', value: 'inactive' },
  ];

  // Mock data - replace with actual data fetching
  const notifications: Notification[] = useMemo(
    () => [
      {
        id: '1',
        title: '🔥 Flash Sale Alert!',
        message: "Don't miss out on these limited-time deals...",
        status: 'active',
        type: 'manual',
        createdAt: '2024-03-20T10:00:00Z',
        image: 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg',
        clicks: 245,
        delivered: 1000,
      },
      {
        id: '2',
        title: '👋 Welcome Offer',
        message: 'Special discount for new customers...',
        status: 'scheduled',
        type: 'automated',
        createdAt: '2024-03-19T15:30:00Z',
        clicks: 180,
        delivered: 800,
      },
      // Add more mock data as needed
    ],
    [],
  );

  const handleTabChange = useCallback((selectedTabIndex: number) => setSelected(selectedTabIndex), []);

  const resourceName = {
    singular: 'notification',
    plural: 'notifications',
  };

  // Filter notifications based on search, status and tab
  const filteredNotifications = React.useMemo(() => {
    return notifications
      .filter((notification) => {
        const matchesSearch = searchValue
          ? notification.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchValue.toLowerCase())
          : true;

        const matchesStatus = statusValue === 'all' ? true : notification.status === statusValue;

        const matchesType = tabs[selected].id === notification.type;

        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        if (sortValue === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
  }, [notifications, searchValue, statusValue, sortValue, selected, tabs]);

  const emptyStateMarkup = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem',
        color: 'var(--p-color-text-subdued)',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <Icon source={SearchIcon} />
      </div>
      <p>No results found</p>
      <p>Please use fewer keywords or remove the filters.</p>
    </div>
  );

  return (
    <Page
      title="Push notifications"
      primaryAction={<Button variant="primary">Create push notification</Button>}
      secondaryActions={[
        {
          content: 'Manage segments',
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <LegacyCard>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <LegacyCard.Section>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <TextField
                      label="Search notification"
                      prefix={<Icon source={SearchIcon} />}
                      value={searchValue}
                      onChange={setSearchValue}
                      placeholder="Search notification"
                      autoComplete="off"
                    />
                  </div>
                  <ButtonGroup>
                    <Select
                      label="Status"
                      labelHidden
                      options={statusOptions}
                      value={statusValue}
                      onChange={setStatusValue}
                    />
                    <Select
                      label="Sort by"
                      labelHidden
                      options={sortOptions}
                      value={sortValue}
                      onChange={setSortValue}
                    />
                  </ButtonGroup>
                </div>

                {filteredNotifications.length > 0 ? (
                  <IndexTable
                    resourceName={resourceName}
                    itemCount={filteredNotifications.length}
                    headings={[
                      { title: 'Title' },
                      { title: 'Status' },
                      { title: 'Type' },
                      { title: 'Delivered' },
                      { title: 'Clicks' },
                      { title: 'CTR' },
                    ]}
                    selectable={false}
                  >
                    {filteredNotifications.map(
                      ({ id, title, status, type, createdAt, clicks, delivered, image }, index) => (
                        <IndexTable.Row id={id} key={id} position={index}>
                          <IndexTable.Cell>
                            <Link to={`/app/notification/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {image && <Thumbnail source={image} alt={title} size="small" />}
                                <div>
                                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                                    {title}
                                  </Text>
                                  <Text variant="bodySm" as="span" tone="subdued">
                                    {new Date(createdAt).toLocaleDateString()}
                                  </Text>
                                </div>
                              </div>
                            </Link>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Badge
                              tone={status === 'active' ? 'success' : status === 'scheduled' ? 'warning' : 'critical'}
                            >
                              {status}
                            </Badge>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Badge tone={type === 'automated' ? 'info' : undefined}>{type}</Badge>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Text as="span" variant="bodyMd">
                              {delivered.toLocaleString()}
                            </Text>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Text as="span" variant="bodyMd">
                              {clicks.toLocaleString()}
                            </Text>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Text as="span" variant="bodyMd">
                              {((clicks / delivered) * 100).toFixed(1)}%
                            </Text>
                          </IndexTable.Cell>
                        </IndexTable.Row>
                      ),
                    )}
                  </IndexTable>
                ) : (
                  emptyStateMarkup
                )}
              </LegacyCard.Section>
            </Tabs>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
