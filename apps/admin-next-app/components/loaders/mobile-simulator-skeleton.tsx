import styles from './shimmer.module.css';

export default function MobileSimulatorSkeleton() {
  return (
    <div style={{ padding: '20px' }}>
      {/* Banner block shimmer */}
      <div className={`${styles.shimmer} ${styles.block}`} />
      
      {/* Circle items row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', justifyContent: 'center' }}>
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className={`${styles.shimmer} ${styles.circle}`} style={{ marginBottom: '8px' }} />
            <div 
              className={`${styles.shimmer} ${styles.line}`} 
              style={{ width: '40px' }} 
            />
          </div>
        ))}
      </div>

      {/* Product grid shimmer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div 
              className={`${styles.shimmer} ${styles.block}`} 
              style={{ height: '120px' }} 
            />
            <div 
              className={`${styles.shimmer} ${styles.line}`} 
              style={{ width: '80%', marginTop: '8px' }} 
            />
            <div 
              className={`${styles.shimmer} ${styles.line}`} 
              style={{ width: '40%', marginTop: '8px' }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
} 