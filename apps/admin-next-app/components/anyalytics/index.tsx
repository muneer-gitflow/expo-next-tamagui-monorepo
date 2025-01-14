import React, { useState } from 'react';
import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  Select,
  DatePicker,
  ButtonGroup,
  Grid,
  InlineStack,
  ProgressBar,
  Button,
  Box,
} from '@shopify/polaris';
import { Smartphone, Users, TrendingUp, ShoppingBag, DollarSign, ShoppingCart, Bell, BarChart2 } from 'lucide-react';

interface ReferrerData {
  source: string;
  icon?: React.ReactNode;
  visitors: number;
  revenue: string;
  revenuePerVisitor: string;
  conversionRate: string;
}

export default function Analytics() {
  const [selected, setSelected] = useState('7d');
  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const timeRanges = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 3 months', value: '90d' },
    { label: 'Last year', value: '365d' },
    { label: 'Custom', value: 'custom' },
  ];

  const metrics = {
    summary: {
      visitors: '2.7k',
      revenue: '$1.8k',
      revenuePerVisitor: '$0.67',
      conversionRate: '0.33%',
      bounceRate: '75%',
      sessionTime: '1m 33s',
      currentVisitors: 10,
    },
    referrers: [
      {
        source: 'Direct/None',
        visitors: 1100,
        revenue: '$500',
        revenuePerVisitor: '$0.45',
        conversionRate: '0.8%',
      },
      {
        source: 'Google',
        visitors: 500,
        revenue: '$300',
        revenuePerVisitor: '$0.60',
        conversionRate: '1.2%',
      },
      {
        source: 'Facebook',
        visitors: 225,
        revenue: '$150',
        revenuePerVisitor: '$0.67',
        conversionRate: '1.5%',
      },
      {
        source: 'Twitter',
        visitors: 199,
        revenue: '$120',
        revenuePerVisitor: '$0.60',
        conversionRate: '1.1%',
      },
    ],
    app: {
      totalInstalls: '12,543',
      activeUsers: '8,976',
      newUsers: '1,234',
      retention: '72%',
      crashRate: '0.5%',
      avgSessionTime: '8m 45s',
    },
    store: {
      totalOrders: '3,456',
      revenue: '$45,678',
      avgOrderValue: '$132',
      conversionRate: '3.2%',
      abandonedCarts: '245',
      topProducts: [
        { name: 'Product A', sales: 234 },
        { name: 'Product B', sales: 189 },
        { name: 'Product C', sales: 156 },
      ],
    },
    engagement: {
      pushNotifications: {
        sent: '15,678',
        delivered: '15,234',
        opened: '3,456',
        ctr: '22.7%',
      },
      features: {
        wishlist: '2,345',
        search: '12,456',
        cart: '4,567',
        checkout: '3,123',
      },
    },
  };

  interface IconWrapperProps {
    children: React.ReactNode;
  }

  const IconWrapper = ({ children }: IconWrapperProps) => (
    <div style={{ color: 'var(--p-icon)', width: '20px', height: '20px', display: 'flex' }}>{children}</div>
  );

  // First, let's create a consistent card style
  const CARD_MIN_HEIGHT = '180px';

  return (
    <Page
      title="Analytics Dashboard"
      primaryAction={
        <ButtonGroup>
          <Select label="Time range" labelHidden options={timeRanges} value={selected} onChange={setSelected} />
          {selected === 'custom' && (
            <DatePicker
              month={month}
              year={year}
              onChange={(date: { start: Date; end: Date }) => {
                setDate({ month: date.start.getMonth(), year: date.start.getFullYear() });
              }}
              selected={{
                start: new Date(),
                end: new Date(),
              }}
            />
          )}
        </ButtonGroup>
      }
    >
      <BlockStack gap="500">
        {/* App Performance Section */}
        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">
              App Performance
            </Text>
          </Layout.Section>
          <Layout.Section>
            <Grid>
              <Grid.Cell columnSpan={{ sm: 4, md: 4, lg: 4, xl: 4 }}>
                <Card>
                  <BlockStack gap="400">
                    <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingSm">
                            Total Installs
                          </Text>
                          <IconWrapper>
                            <Smartphone size={20} />
                          </IconWrapper>
                        </InlineStack>
                        <Text as="h2" variant="headingLg">
                          {metrics.app.totalInstalls}
                        </Text>
                        <Text as="p" tone="success">
                          ↑ 12% vs last period
                        </Text>
                      </BlockStack>
                    </div>
                  </BlockStack>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ sm: 4, md: 4, lg: 4, xl: 4 }}>
                <Card>
                  <BlockStack gap="400">
                    <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingSm">
                            Active Users
                          </Text>
                          <IconWrapper>
                            <Users size={20} />
                          </IconWrapper>
                        </InlineStack>
                        <Text as="h2" variant="headingLg">
                          {metrics.app.activeUsers}
                        </Text>
                        <Text as="p" tone="success">
                          ↑ 8% vs last period
                        </Text>
                      </BlockStack>
                    </div>
                  </BlockStack>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ sm: 4, md: 4, lg: 4, xl: 4 }}>
                <Card>
                  <BlockStack gap="400">
                    <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingSm">
                            Retention Rate
                          </Text>
                          <IconWrapper>
                            <TrendingUp size={20} />
                          </IconWrapper>
                        </InlineStack>
                        <Text as="h2" variant="headingLg">
                          {metrics.app.retention}
                        </Text>
                        <ProgressBar progress={72} size="small" />
                        {metrics.app.retention < '75%' && (
                          <BlockStack gap="200">
                            <Text as="p" variant="bodySm" tone="subdued">
                              Boost retention:
                            </Text>
                            <ButtonGroup gap="tight">
                              <Button
                                variant="plain"
                                textAlign="left"
                                tone="success"
                                onClick={() => {
                                  // Handle navigation or action
                                }}
                              >
                                Create engagement campaign
                              </Button>
                              <Button
                                variant="plain"
                                textAlign="left"
                                onClick={() => {
                                  // Handle navigation or action
                                }}
                              >
                                View churned users
                              </Button>
                            </ButtonGroup>
                          </BlockStack>
                        )}
                      </BlockStack>
                    </div>
                  </BlockStack>
                </Card>
              </Grid.Cell>
            </Grid>
          </Layout.Section>
        </Layout>

        {/* Store Performance Section */}
        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">
              Store Performance
            </Text>
          </Layout.Section>
          <Layout.Section>
            <Grid>
              <Grid.Cell columnSpan={{ sm: 4, md: 4, lg: 4, xl: 4 }}>
                <Card>
                  <BlockStack gap="400">
                    <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingSm">
                            Total Orders
                          </Text>
                          <IconWrapper>
                            <ShoppingBag size={20} />
                          </IconWrapper>
                        </InlineStack>
                        <Text as="h2" variant="headingLg">
                          {metrics.store.totalOrders}
                        </Text>
                        <Text as="p" tone="success">
                          ↑ 15% vs last period
                        </Text>
                      </BlockStack>
                    </div>
                  </BlockStack>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ sm: 4, md: 4, lg: 4, xl: 4 }}>
                <Card>
                  <BlockStack gap="400">
                    <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingSm">
                            Revenue
                          </Text>
                          <IconWrapper>
                            <DollarSign size={20} />
                          </IconWrapper>
                        </InlineStack>
                        <Text as="h2" variant="headingLg">
                          {metrics.store.revenue}
                        </Text>
                        <Text as="p" tone="success">
                          ↑ 18% vs last period
                        </Text>
                      </BlockStack>
                    </div>
                  </BlockStack>
                </Card>
              </Grid.Cell>

              <Grid.Cell columnSpan={{ sm: 4, md: 4, lg: 4, xl: 4 }}>
                <Card>
                  <BlockStack gap="400">
                    <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingSm">
                            Abandoned Carts
                          </Text>
                          <IconWrapper>
                            <ShoppingCart size={20} />
                          </IconWrapper>
                        </InlineStack>
                        <Text as="h2" variant="headingLg">
                          {metrics.store.abandonedCarts}
                        </Text>
                        <Text as="p" tone="caution">
                          ↓ Recovery opportunity
                        </Text>
                        <BlockStack gap="200">
                          <Text as="p" variant="bodySm" tone="subdued">
                            Recommended actions:
                          </Text>
                          <ButtonGroup gap="tight">
                            <Button
                              variant="plain"
                              textAlign="left"
                              onClick={() => {
                                // Handle navigation or action
                              }}
                            >
                              Send reminder notifications
                            </Button>
                            <Button
                              variant="plain"
                              textAlign="left"
                              onClick={() => {
                                // Handle navigation or action
                              }}
                            >
                              View cart details
                            </Button>
                          </ButtonGroup>
                        </BlockStack>
                      </BlockStack>
                    </div>
                  </BlockStack>
                </Card>
              </Grid.Cell>
            </Grid>
          </Layout.Section>
        </Layout>

        {/* Engagement Section */}
        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">
              User Engagement
            </Text>
          </Layout.Section>
          <Layout.Section>
            <Grid>
              <Grid.Cell columnSpan={{ sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Card>
                  <BlockStack gap="400">
                    <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingSm">
                            Push Notifications
                          </Text>
                          <IconWrapper>
                            <Bell size={20} />
                          </IconWrapper>
                        </InlineStack>
                        <BlockStack gap="200">
                          <InlineStack align="space-between">
                            <Text as="p">Sent</Text>
                            <Text as="p">{metrics.engagement.pushNotifications.sent}</Text>
                          </InlineStack>
                          <InlineStack align="space-between">
                            <Text as="p">Delivered</Text>
                            <Text as="p">{metrics.engagement.pushNotifications.delivered}</Text>
                          </InlineStack>
                          <InlineStack align="space-between">
                            <Text as="p">Opened</Text>
                            <Text as="p">{metrics.engagement.pushNotifications.opened}</Text>
                          </InlineStack>
                          <InlineStack align="space-between">
                            <Text as="p">CTR</Text>
                            <Text as="p">{metrics.engagement.pushNotifications.ctr}</Text>
                          </InlineStack>
                        </BlockStack>
                      </BlockStack>
                    </div>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Card>
                  <BlockStack gap="400">
                    <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text as="h3" variant="headingSm">
                            Feature Usage
                          </Text>
                          <IconWrapper>
                            <BarChart2 size={20} />
                          </IconWrapper>
                        </InlineStack>
                        <BlockStack gap="200">
                          {Object.entries(metrics.engagement.features).map(([feature, count]) => (
                            <InlineStack key={feature} align="space-between">
                              <Text as="p">{feature}</Text>
                              <Text as="p">{count}</Text>
                            </InlineStack>
                          ))}
                        </BlockStack>
                      </BlockStack>
                    </div>
                  </BlockStack>
                </Card>
              </Grid.Cell>
            </Grid>
          </Layout.Section>
        </Layout>

        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">Traffic Sources</Text>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingSm">Source</Text>
                      <InlineStack gap="800">
                        <Text variant="headingSm">Visitors</Text>
                        <Text variant="headingSm">Revenue</Text>
                        <Text variant="headingSm">Revenue/Visitor</Text>
                        <Text variant="headingSm">Conv. Rate</Text>
                      </InlineStack>
                    </InlineStack>
                    
                    {metrics.referrers.map((referrer) => (
                      <InlineStack key={referrer.source} align="space-between">
                        <Text variant="bodyMd">{referrer.source}</Text>
                        <InlineStack gap="800">
                          <Text variant="bodyMd">{referrer.visitors}</Text>
                          <Text variant="bodyMd">{referrer.revenue}</Text>
                          <Text variant="bodyMd">{referrer.revenuePerVisitor}</Text>
                          <Text variant="bodyMd">{referrer.conversionRate}</Text>
                        </InlineStack>
                      </InlineStack>
                    ))}
                  </BlockStack>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">Current Activity</Text>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <BlockStack gap="200">
                    <Text variant="headingSm">Visitors now</Text>
                    <Text variant="headingLg">{metrics.summary.currentVisitors}</Text>
                  </BlockStack>
                  <BlockStack gap="200" align="end">
                    <Text variant="bodySm" tone="subdued">Last updated</Text>
                    <Text variant="bodyMd">Just now</Text>
                  </BlockStack>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">Time Distribution</Text>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingSm">Peak Hours</Text>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text>Most active</Text>
                    <Text>12:00 PM - 2:00 PM</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text>Least active</Text>
                    <Text>3:00 AM - 5:00 AM</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingSm">Day Distribution</Text>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text>Busiest day</Text>
                    <Text>Wednesday</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text>Quietest day</Text>
                    <Text>Sunday</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Daily Sales Section */}
        <Layout>
          <Layout.Section>
            <Text variant="headingMd" as="h2">Daily Sales Overview</Text>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <div style={{ minHeight: CARD_MIN_HEIGHT }}>
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingSm">
                        Sales Distribution
                      </Text>
                      <InlineStack gap="200">
                        <Text as="p" variant="bodySm" tone="subdued">
                          Total Sales Today:
                        </Text>
                        <Text as="p" variant="headingSm" tone="success">
                          ${metrics.store.revenue}
                        </Text>
                      </InlineStack>
                    </InlineStack>

                    <BlockStack gap="300">
                      {[
                        { time: '00:00 - 04:00', sales: '$2,345', percentage: 15 },
                        { time: '04:00 - 08:00', sales: '$1,234', percentage: 8 },
                        { time: '08:00 - 12:00', sales: '$5,678', percentage: 35 },
                        { time: '12:00 - 16:00', sales: '$3,456', percentage: 22 },
                        { time: '16:00 - 20:00', sales: '$2,567', percentage: 16 },
                        { time: '20:00 - 24:00', sales: '$789', percentage: 4 },
                      ].map((timeSlot) => (
                        <BlockStack key={timeSlot.time} gap="200">
                          <InlineStack align="space-between">
                            <Text as="p" variant="bodyMd">
                              {timeSlot.time}
                            </Text>
                            <Text as="p" variant="bodyMd">
                              {timeSlot.sales}
                            </Text>
                          </InlineStack>
                          <ProgressBar
                            progress={timeSlot.percentage}
                            size="small"
                            tone={timeSlot.percentage > 30 ? 'success' : undefined}
                          />
                        </BlockStack>
                      ))}
                    </BlockStack>

                    <Box paddingBlockStart="200">
                      <InlineStack align="space-between">
                        <Text as="p" variant="bodySm" tone="subdued">
                          Highest volume: 08:00 - 12:00
                        </Text>
                        <Text as="p" variant="bodySm" tone="success">
                          35% of daily sales
                        </Text>
                      </InlineStack>
                    </Box>
                  </BlockStack>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
