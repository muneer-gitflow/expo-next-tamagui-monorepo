import { Box, InlineGrid } from '@shopify/polaris';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';
import type { CategoryLabelType } from './config';

interface Props {
  blockId: string;
  isActive: boolean;
}

export default function CategoryLabelsRender({ blockId, isActive }: Props) {
  const dndBlocks = useSelector((state: RootState) => state?.dnd?.droppedComponents);
  const configToRender = dndBlocks?.find((c) => c.block_id === blockId)?.config as CategoryLabelType[];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        cursor: 'grab',
      }}
    >
      {configToRender?.map((item, i) => (
        <Box key={item.id}>
          <div
            style={{
              marginRight: '12px',
            }}
          >
            <InlineGrid gap={'100'} alignItems="center">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f1f1',
                  height: '60px',
                  width: '60px',
                  borderRadius: '100%',
                }}
              >
                <img width="18" src={item?.image} alt="" />
              </div>
              <span
                style={{
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {item?.displayText || 'Text'}
              </span>
            </InlineGrid>
          </div>
        </Box>
      ))}
    </div>
  );
}
