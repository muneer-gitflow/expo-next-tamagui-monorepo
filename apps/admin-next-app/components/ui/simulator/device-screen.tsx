import React from 'react';
import styles from '../../mobile-simulator.module.css';

interface DeviceScreenProps {
  children: React.ReactNode;
}

export function DeviceScreen({ children }: DeviceScreenProps) {
  return (
    <div
      className={styles.simulatorScreen}
      style={{
        width: 'calc(100% - 19px)',
        height: 'calc(100% - 16px)',
        overflowY: 'scroll',
        position: 'absolute',
        background: '#121212',
        padding: '50px 10px 20px',
        borderRadius: '40px',
        margin: '8px 0 0 10px',
        zIndex: '8',
        scrollbarWidth: 'none',
        border: '1px solid white',
      }}
    >
      {children}
    </div>
  );
} 