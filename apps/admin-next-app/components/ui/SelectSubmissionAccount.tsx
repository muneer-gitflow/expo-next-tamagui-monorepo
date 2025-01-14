import React, { useState } from 'react';
import { Button, Checkbox, FormLayout, Select, Text } from '@shopify/polaris';

export function SelectSubmissionAccount() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Text variant="headingLg" fontWeight="bold" as={'span'}>
        Select submission account
      </Text>
      <div
        style={{
          width: '100%',
          flexDirection: 'column',
          display: 'flex',
          gap: '5px',
        }}
      >
        <Text fontWeight="regular" variant="bodySm" as="span">
          1. Invite OneMobile team as admin.{' '}
          <a
            style={{
              textDecoration: 'none',
              color: '#005bd3',
            }}
            href="#"
            target="_blank"
          >
            View instructions
          </a>
        </Text>
        <Text fontWeight="regular" variant="bodySm" as="span">
          2. No account yet? Our article may help for creating one for{' '}
          <a
            style={{
              textDecoration: 'none',
              color: '#005bd3',
            }}
            href="#"
            target="_blank"
          >
            iOS
          </a>{' '}
          and{' '}
          <a
            style={{
              textDecoration: 'none',
              color: '#005bd3',
            }}
            href="#"
            target="_blank"
          >
            Android
          </a>
          .
        </Text>
        <div
          style={{
            marginTop: '10px',
            fontSize: '10px',
          }}
        >
          <Checkbox label="I've completed the setup" />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Button>Back</Button>
        <Button variant="primary">Next</Button>
      </div>
    </div>
  );
}
