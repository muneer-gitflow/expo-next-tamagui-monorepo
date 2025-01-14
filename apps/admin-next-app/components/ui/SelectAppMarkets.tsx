import { FormLayout, RadioButton, Button, Text } from '@shopify/polaris';
import { useState } from 'react';

export function AppMarkets() {
  const [selected, setSelected] = useState('both');

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
        Select app markets
      </Text>
      <Text variant="headingSm" fontWeight="medium" as={'span'}>
        Available options are Google Play Store for Android and Apple App Store for iOS.
      </Text>
      <div
        style={{
          width: '90%',
          flexDirection: 'column',
          display: 'flex',
          gap: '10px',
        }}
      >
        <RadioButton
          label="Both"
          checked={selected === 'both'}
          id="both"
          name="markets"
          onChange={() => setSelected('both')}
        />
        <RadioButton
          label="App Store (Apple iOS)"
          checked={selected === 'ios'}
          id="ios"
          name="markets"
          onChange={() => setSelected('ios')}
        />
        <RadioButton
          label="Google Play Store (Android)"
          checked={selected === 'android'}
          id="android"
          name="markets"
          onChange={() => setSelected('android')}
        />
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
