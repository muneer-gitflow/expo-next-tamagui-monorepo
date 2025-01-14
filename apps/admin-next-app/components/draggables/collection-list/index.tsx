import CollectionListRender from './render';
import CollectionListConfig from './config';
import CollectionListPreview from './preview';

import type { UIBlock } from '@/lib/store/types';

interface Props {
  mode: 'render' | 'config' | 'preview';
  blockId: string;
  isActive: boolean;
  block: UIBlock;
}

export default function CollectionList({ mode, blockId, isActive, block }: Props) {
  switch (mode) {
    case 'render':
      return <CollectionListRender blockId={blockId} isActive={isActive} />;
    case 'config':
      return <CollectionListConfig blockId={blockId} />;
    case 'preview':
      return <CollectionListPreview blockId={blockId} block={block} />;
    default:
      return null;
  }
}
