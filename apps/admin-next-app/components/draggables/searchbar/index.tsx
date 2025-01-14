import SearchBarConfig from './config';
import SearchBarPreview from './preview';
import SearchBarRender from './render';

export default function SearchBar({ mode, blockId }: { mode: 'render' | 'config' | 'preview'; blockId: string }) {
  switch (mode) {
    case 'render':
      return <SearchBarRender blockId={blockId} />;
    case 'config':
      return <SearchBarConfig blockId={blockId} />;
    case 'preview':
      return <SearchBarPreview blockId={blockId} />;
  }
}
