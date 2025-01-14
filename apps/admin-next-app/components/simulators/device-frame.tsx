import styles from './mobile-simulator.module.css';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div
      className={styles.simulatorScreenOuter}
      style={{
        width: '330px',
        height: '680px',
        margin: 'auto',
        position: 'relative',
        display: 'block',
      }}
    >
      {children}
      <img
        src="/mobileSimulator.png"
        style={{
          width: '100%',
          height: '100%',
        }}
        alt="mobile simulator"
      />
    </div>
  );
}
