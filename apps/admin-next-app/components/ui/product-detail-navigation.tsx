import { Box } from '@shopify/polaris';

import { ArrowLeft, ShareIcon, MoreVertical } from 'lucide-react';

interface SimulatorNavigationHeaderProps {
  showBackButton?: boolean;
  title?: string;
  showShareButton?: boolean;
  showMoreButton?: boolean;
}

export default function SimulatorNavigationHeader({
  showBackButton = true,
  title = 'Product',
  showShareButton = true,
  showMoreButton = true,
}: SimulatorNavigationHeaderProps) {
  return (
    <Box>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '10px 0px',
          position: 'relative',
        }}
      >
        {showBackButton ? (
          <div style={{ position: 'absolute', left: 0 }}>
            <ArrowLeft color="white" width={20} height={20} />
          </div>
        ) : (
          <div style={{ width: '20px' }} />
        )}

        <div
          style={{
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {title}
        </div>

        <div
          style={{
            position: 'absolute',
            right: 0,
            display: 'flex',
            gap: '8px',
          }}
        >
          {showShareButton ? <ShareIcon color="white" width={20} height={20} /> : <div style={{ width: '20px' }} />}
          {showMoreButton ? <MoreVertical color="white" width={20} height={20} /> : <div style={{ width: '20px' }} />}
        </div>
      </div>
    </Box>
  );
}
