import React, { useCallback, useState } from 'react';
import { Button, Icon, Text, TextField } from '@shopify/polaris';
import { ChevronLeftIcon } from '@shopify/polaris-icons';
import Select from 'react-select';
import { wrap } from 'module';
export function SelectAppCategory() {
  const [selected1, setSelected1] = useState('');
  const [selected, setSelected] = useState('');

  const handleSelectChange1 = useCallback((value: string) => setSelected1(value), []);
  const handleSelectChange = useCallback((value: string) => setSelected(value), []);

  const options = [
    { label: 'Sort by', value: '' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'lastWeek' },
  ];
  const options1 = [
    { label: 'Status', value: '' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'lastWeek' },
  ];
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '20px',
            borderBottom: '#EBEBEB solid 1px',
            margin: '-20px -20px 0',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              display: 'flex',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <Icon source={ChevronLeftIcon} tone="base" />
            Push Campaigns
          </span>
          <div
            style={{
              display: 'flex',
              gap: '20px',
            }}
          >
            <TextField label="" placeholder="Search Campaign" autoComplete="off" />
            <Select options={options1} onChange={handleSelectChange1} value={selected1} />
            <Select options={options} onChange={handleSelectChange} value={selected} />
          </div>
        </div>
        <div
          style={{
            border: '#EBEBEB solid 1px',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Text as="h4" variant="headingLg" fontWeight="bold">
            Manual Campaigns
          </Text>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                border: '#DEDE solid 1px',
                borderRadius: '10px',
                padding: '20px',
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <img src="/notification_new.png"></img>
              <Text as="h5" variant="headingMd" fontWeight="bold">
                New
              </Text>
              <Text as="span" variant="bodySm" alignment="center" tone="text-inverse-secondary">
                Create personalized notifications from scratch and send them out as needed.
              </Text>
            </div>
          </div>
        </div>
        <div
          style={{
            border: '#EBEBEB solid 1px',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Text as="h4" variant="headingLg" fontWeight="bold">
            Automated Campaigns
          </Text>
          <div
            style={{
              display: 'flex',
              gap: '20px',
            }}
          >
            <div
              style={{
                border: '#DEDE solid 1px',
                borderRadius: '10px',
                padding: '20px',
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <img src="/welcomeOffer.png"></img>
              <Text as="h5" variant="headingMd" fontWeight="bold">
                Welcome Offer
              </Text>
              <Text as="span" variant="bodySm" alignment="center" tone="text-inverse-secondary">
                Create personalized notifications from scratch and send them out as needed.
              </Text>
            </div>
            <div
              style={{
                border: '#DEDE solid 1px',
                borderRadius: '10px',
                padding: '20px',
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <img src="/abandonedCart.png"></img>
              <Text as="h5" variant="headingMd" fontWeight="bold">
                Abandoned cart
              </Text>
              <Text as="span" variant="bodySm" alignment="center" tone="text-inverse-secondary">
                Create personalized notifications from scratch and send them out as needed.
              </Text>
            </div>
            <div
              style={{
                border: '#DEDE solid 1px',
                borderRadius: '10px',
                padding: '20px',
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <img src="/inactiveUser.png"></img>
              <Text as="h5" variant="headingMd" fontWeight="bold">
                Inactive user
              </Text>
              <Text as="span" variant="bodySm" alignment="center" tone="text-inverse-secondary">
                Create personalized notifications from scratch and send them out as needed.
              </Text>
            </div>
            <div
              style={{
                border: '#DEDE solid 1px',
                borderRadius: '10px',
                padding: '20px',
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <img src="/customNotification.png"></img>
              <Text as="h5" variant="headingMd" fontWeight="bold">
                Custom Notification
              </Text>
              <Text as="span" variant="bodySm" alignment="center" tone="text-inverse-secondary">
                Create personalized notifications from scratch and send them out as needed.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
