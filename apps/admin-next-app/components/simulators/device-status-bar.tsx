import React, { useCallback, useEffect, useState } from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';
import styles from './mobile-simulator.module.css';

export function DeviceStatusBar() {
  const [realTimeDateAndTime, setRealTimeDateAndTime] = useState(
    new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
  );
  const getRealTimeDateAndTime = useCallback(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setRealTimeDateAndTime(date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getRealTimeDateAndTime();
  }, [getRealTimeDateAndTime]);

  return (
    <div
      className={styles.deviceHead}
      style={{
        width: 'calc(100% - 21px)',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: '9',
        height: '38px',
        alignItems: 'center',
        background: '#2f323d',
        marginLeft: '11px',
        padding: '11px 15px 0',
        borderRadius: '45px 45px 0 0',
        marginTop: '10px',
      }}
    >
      <TimeDisplay realTimeDateAndTime={realTimeDateAndTime} />
      <NotchImage />
      <StatusIcons />
    </div>
  );
}

function TimeDisplay({ realTimeDateAndTime }: { realTimeDateAndTime: string }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        color: '#fff',
      }}
    >
      {realTimeDateAndTime}
    </span>
  );
}

function NotchImage() {
  return (
    <img
      src="/notch.png"
      style={{
        width: '94px',
        height: '28px',
        left: '0',
        right: '0',
        margin: 'auto',
        position: 'absolute',
      }}
      className={styles.notchPreview}
      alt="notch"
    />
  );
}

function StatusIcons() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <Signal size={16} color="#fff" strokeWidth={2} aria-label="Signal strength" />
      <Wifi size={16} color="#fff" strokeWidth={2} aria-label="Wifi status" />
      <Battery size={16} color="#fff" strokeWidth={2} aria-label="Battery status" />
    </span>
  );
}
