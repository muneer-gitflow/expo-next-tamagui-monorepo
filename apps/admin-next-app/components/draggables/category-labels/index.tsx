import CategoryLabelsRender from './render';
import CategoryLabelsConfig from './config';
import CategoryLabelsPreview from './preview';
import type { UIBlock } from '@/lib/store/types';

interface Props {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
  isActive: boolean;
  block: UIBlock;
}

export default function CategoryLabels({ mode, blockId, isActive, block }: Props) {
  switch (mode) {
    case 'render':
      return <CategoryLabelsRender blockId={blockId} isActive={isActive} />;
    case 'config':
      return <CategoryLabelsConfig blockId={blockId} />;
    case 'preview':
      return <CategoryLabelsPreview blockId={blockId} block={block} />;
    default:
      return null;
  }
}
